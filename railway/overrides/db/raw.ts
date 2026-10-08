import {prisma} from '@/lib/prisma';
// Fixed, application-owned SQL only. Placeholders remain parameterized in PostgreSQL.
class Statement {
 args:unknown[]=[];constructor(readonly sql:string){}
 bind(...args:unknown[]){this.args=args;return this;}
 query(){let i=0;return this.sql.replace(/\?/g,()=>`$${++i}`);}
 async all(){const result=await prisma.$queryRawUnsafe(this.query(),...this.args);return {results:JSON.parse(JSON.stringify(result,(_,v)=>typeof v==='bigint'?Number(v):v))};}
 async first<T>(){return ((await this.all()).results as T[])[0]??null;}
 async run(){return prisma.$executeRawUnsafe(this.query(),...this.args);}
}
export function database(){return {prepare:(sql:string)=>new Statement(sql),batch:(statements:Statement[])=>prisma.$transaction(statements.map(s=>prisma.$executeRawUnsafe(s.query(),...s.args)),{isolationLevel:"Serializable"})};}
export function isAdmin(email:string){return Boolean(process.env.ADMIN_EMAILS?.split(',').map(x=>x.trim().toLowerCase()).includes(email.toLowerCase()));}
export function validOrigin(request:Request){return !!process.env.APP_URL&&request.headers.get('origin')===new URL(process.env.APP_URL).origin;}
