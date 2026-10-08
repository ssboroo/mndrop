import {PrismaClient} from '@prisma/client';
const g=globalThis as unknown as {beautyPrisma?:PrismaClient};
export const prisma=g.beautyPrisma??new PrismaClient();
if(process.env.NODE_ENV!=='production')g.beautyPrisma=prisma;
