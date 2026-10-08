import {cookies} from 'next/headers';
import {createHash} from 'node:crypto';
import {prisma} from '@/lib/prisma';
import {isAdmin} from '@/db/raw';
export async function getChatGPTUser(){const token=(await cookies()).get('__Host-beauty-session')?.value;if(!token||!/^[a-f0-9]{64}$/.test(token))return null;const tokenHash=createHash('sha256').update(token).digest('hex');const session=await prisma.session.findUnique({where:{tokenHash},include:{user:true}});if(!session||session.expiresAt<=new Date()||isAdmin(session.user.email)&&!session.user.emailVerifiedAt)return null;return {userId:session.user.id,email:session.user.email,displayName:session.user.email,emailVerified:!!session.user.emailVerifiedAt,fullName:null};}
