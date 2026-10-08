import {randomBytes,scrypt as derive,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
const scrypt=promisify(derive);
export function validPassword(value:unknown):value is string{return typeof value==='string'&&value.length>=12&&value.length<=128&&Buffer.byteLength(value,'utf8')<=512;}
export async function hashPassword(password:string){const salt=randomBytes(16).toString('hex');const key=await scrypt(password,salt,64) as Buffer;return `scrypt:${salt}:${key.toString('hex')}`;}
export async function verifyPassword(password:string,encoded:string){const [kind,salt,hex]=encoded.split(':');if(kind!=='scrypt'||!salt||!hex||!/^[a-f0-9]{128}$/.test(hex))return false;const actual=await scrypt(password,salt,64) as Buffer;return timingSafeEqual(actual,Buffer.from(hex,'hex'));}
