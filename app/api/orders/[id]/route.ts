import {getChatGPTUser} from '@/app/chatgpt-auth';
import {isAdmin,validOrigin} from '@/db/raw';
import {expireInvoice} from '@/lib/checkout-service';
import {CommerceError} from '@/lib/commerce-types';
import {orderDetail} from '@/lib/commerce-store';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const u=await getChatGPTUser();if(!u)return Response.json({error:'Sign in required'},{status:401});try{const order=await orderDetail((await params).id,isAdmin(u.email)?undefined:u.userId);return order?Response.json({order},{headers:{'Cache-Control':'no-store'}}):Response.json({error:'Order not found'},{status:404})}catch{return Response.json({error:'Order storage unavailable'},{status:503})}}

export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){if(!validOrigin(req))return Response.json({error:'Invalid origin'},{status:403});const u=await getChatGPTUser();if(!u)return Response.json({error:'Sign in required'},{status:401});try{const id=(await params).id,order=await orderDetail(id,u.userId);if(!order||order.status!=='PAYMENT_PENDING')return Response.json({error:'Pending order required; paid order cancellations require support'},{status:409});await expireInvoice(id,true);return Response.json({cancelled:true})}catch(e){return Response.json({error:e instanceof CommerceError?e.message:'Invoice cancellation requires support reconciliation'},{status:503})}}
