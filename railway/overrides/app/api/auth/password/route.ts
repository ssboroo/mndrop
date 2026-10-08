import {createHash,randomBytes} from 'node:crypto';
import {cookies} from 'next/headers';
import {prisma} from '@/lib/prisma';
import {validOrigin,isAdmin} from '@/db/raw';
import {readAuthBody,acceptsRegistrationTerms,registrationTermsVersion} from '@/lib/auth-request';
import {hashPassword,verifyPassword,validPassword} from '@/lib/password-auth';
const response=(error:string,status:number,code=({400:'INVALID_INPUT',401:'INVALID_CREDENTIALS',403:'INVALID_ORIGIN',409:'ACCOUNT_UNAVAILABLE',413:'BODY_TOO_LARGE',429:'RATE_LIMITED',503:'UNAVAILABLE'} as Record<number,string>)[status]||'UNAVAILABLE')=>Response.json({error,code},{status,headers:{'Cache-Control':'no-store'}});
export async function POST(req:Request){
 if(!validOrigin(req))return response('Invalid origin',403);
 let b:any;try{b=JSON.parse(await readAuthBody(req))}catch(e){return response(e instanceof Error&&e.message==='BODY_TOO_LARGE'?'Request too large':'Invalid request',e instanceof Error&&e.message==='BODY_TOO_LARGE'?413:400)}
 if(!b||typeof b!=='object'||Array.isArray(b))return response('Invalid request',400);
 if(b.action==='register'&&!acceptsRegistrationTerms(b.acceptTerms))return response('Accept the terms and privacy policy to create an account.',400,'TERMS_REQUIRED');
 const email=typeof b.email==='string'?b.email.trim().toLowerCase():'';
 if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!validPassword(b.password)||!['register','login'].includes(b.action))return response('Enter a valid email and a password of 12–128 characters.',400);
 try{
 // The global budget remains effective even when forwarded IP headers are spoofed.
 const ip=(req.headers.get('x-forwarded-for')||'unknown').split(',').at(-1)!.trim().slice(0,200);
 const budgets:[string,number][]=[['password:global',300],['password:ip:'+createHash('sha256').update(ip).digest('hex'),30],['password:email:'+createHash('sha256').update(email).digest('hex'),10]];
 const allowed=await prisma.$transaction(async tx=>{const now=new Date();for(const [key,limit] of budgets){await tx.rateLimit.upsert({where:{key},create:{key,count:0,window:now},update:{}});await tx.$queryRaw`SELECT 1 FROM "RateLimit" WHERE "key"=${key} FOR UPDATE`;const r=await tx.rateLimit.findUniqueOrThrow({where:{key}});if(r.window.getTime()<now.getTime()-900000){await tx.rateLimit.update({where:{key},data:{window:now,count:1}})}else{if(r.count>=limit)return false;await tx.rateLimit.update({where:{key},data:{count:{increment:1}}})}}return true});
 if(!allowed)return response('Too many attempts. Please try again in 15 minutes.',429);
 let user=await prisma.user.findUnique({where:{email}});
 if(b.action==='register'){
 // Reserved staff identities must prove email ownership before acquiring sessions.
 if(user||isAdmin(email))return response('Could not create this account. Try signing in or contact support.',409);
 const passwordHash=await hashPassword(b.password);user=await prisma.user.create({data:{email,passwordHash,termsAcceptedAt:new Date(),termsVersion:registrationTermsVersion}});
 }else{
 const hash=user?.passwordHash||'scrypt:00000000000000000000000000000000:'+ '0'.repeat(128);
 const matches=await verifyPassword(b.password,hash);
 if(!matches||!user?.passwordHash||isAdmin(email)&&!user.emailVerifiedAt)return response('Email or password is incorrect.',401);
 }
 const token=randomBytes(32).toString('hex');const sessionCreated=await prisma.$transaction(async tx=>{await tx.$queryRaw`SELECT 1 FROM "User" WHERE "id"=${user!.id} FOR UPDATE`;const current=await tx.user.findUniqueOrThrow({where:{id:user!.id}});if(!current.passwordHash||current.passwordHash!==user!.passwordHash||isAdmin(current.email)&&!current.emailVerifiedAt)return false;await tx.session.create({data:{tokenHash:createHash('sha256').update(token).digest('hex'),userId:current.id,expiresAt:new Date(Date.now()+7*86400000)}});return true});if(!sessionCreated)return response('Email or password is incorrect.',401);
 const jar=await cookies();const old=jar.get('__Host-beauty-session')?.value;if(old)await prisma.session.deleteMany({where:{tokenHash:createHash('sha256').update(old).digest('hex')}});
 jar.set('__Host-beauty-session',token,{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:7*86400});
 return Response.json({signedIn:true,emailVerified:!!user!.emailVerifiedAt},{headers:{'Cache-Control':'no-store'}});
 }catch{return response('Sign-in is temporarily unavailable. Please retry.',503)}
}
