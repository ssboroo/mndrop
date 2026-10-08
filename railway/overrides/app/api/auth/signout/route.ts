import {cookies} from 'next/headers';
import {createHash} from 'node:crypto';
import {prisma} from '@/lib/prisma';
import {validOrigin} from '@/db/raw';
export async function POST(req:Request){if(!validOrigin(req))return Response.json({error:'Invalid origin'},{status:403});const c=await cookies(),token=c.get('__Host-beauty-session')?.value;if(token)await prisma.session.deleteMany({where:{tokenHash:createHash('sha256').update(token).digest('hex')}});c.set('__Host-beauty-session','',{path:'/',secure:true,httpOnly:true,maxAge:0});return Response.json({signedOut:true})}
