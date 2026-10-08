import {cookies} from 'next/headers';
import {createHash} from 'node:crypto';
import {prisma} from '@/lib/prisma';
export async function getChatGPTUser(){const token=(await cookies()).get('__Host-beauty-session')?.value;if(!token)return null;const tokenHash=createHash('sha256').update(token).digest('hex');const session=await prisma.session.findUnique({where:{tokenHash},include:{user:true}});if(!session||session.expiresAt<new Date())return null;return {userId:session.user.id,email:session.user.email,displayName:session.user.email,fullName:null};}
