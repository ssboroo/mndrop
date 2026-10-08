import {env} from 'cloudflare:workers';
export function database(){if(!env.DB)throw new Error('DATABASE_UNAVAILABLE');return env.DB as D1Database;}
export function isAdmin(email:string){const list=(env as unknown as Record<string,string>).ADMIN_EMAILS;return Boolean(list?.split(',').map(x=>x.trim().toLowerCase()).includes(email.toLowerCase()));}
export function validOrigin(request:Request){const o=request.headers.get('origin');return !!o && o===new URL(request.url).origin;}
