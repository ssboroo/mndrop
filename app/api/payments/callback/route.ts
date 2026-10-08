import {receivePayment} from '@/lib/checkout-service';
import {CommerceError} from '@/lib/commerce-types';
async function callback(req:Request){const url=new URL(req.url),id=url.searchParams.get('order')||'',token=url.searchParams.get('token')||'';if(id.length>100||token.length>150)return Response.json({error:'Invalid callback'},{status:400});try{return Response.json(await receivePayment(id,token))}catch(e){return Response.json({error:e instanceof CommerceError?e.message:'Callback verification unavailable'},{status:e instanceof CommerceError?e.status:503})}}
export const POST=callback;
export const GET=callback;
