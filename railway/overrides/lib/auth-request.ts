export async function readAuthBody(req:Request,maxBytes=4096){
 const length=req.headers.get('content-length');if(length&&(!/^\d+$/.test(length)||Number(length)>maxBytes))throw new Error('BODY_TOO_LARGE');
 if(!req.body)return '';
 const reader=req.body.getReader();const chunks:Uint8Array[]=[];let total=0;
 try{while(true){const {done,value}=await reader.read();if(done)break;total+=value.byteLength;if(total>maxBytes){await reader.cancel();throw new Error('BODY_TOO_LARGE')}chunks.push(value)}}finally{reader.releaseLock()}
 const bytes=new Uint8Array(total);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength}return new TextDecoder('utf-8',{fatal:true}).decode(bytes);
}

export const registrationTermsVersion='2026-10-08';
export function acceptsRegistrationTerms(value:unknown){return value===true;}
