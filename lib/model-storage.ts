import {env} from 'cloudflare:workers';
export function modelConfig(){const e=env as unknown as Record<string,any>;return {key:e.MESHY_API_KEY as string|undefined,bucket:e.MEDIA as R2Bucket|undefined}}
export async function putModelFile(key:string,bytes:Uint8Array,type:string){const b=modelConfig().bucket;if(!b)throw Error('Media storage is not configured');await b.put(key,bytes,{httpMetadata:{contentType:type}})}
export async function getModelFile(key:string){const b=modelConfig().bucket;if(!b)throw Error('Media storage is not configured');const o=await b.get(key);return o?{body:o.body,type:o.httpMetadata?.contentType||'application/octet-stream'}:null}
