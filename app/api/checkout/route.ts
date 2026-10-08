import {getChatGPTUser} from '@/app/chatgpt-auth';
import {validOrigin} from '@/db/raw';
import {reserveCheckout} from '@/lib/checkout-service';
import {CommerceError} from '@/lib/commerce-types';
import {paymentReady} from '@/lib/commerce-payments';
export async function GET(){return Response.json({available:paymentReady()})}
export async function POST(req:Request){if(!validOrigin(req))return Response.json({error:'Invalid origin'},{status:403});const u=await getChatGPTUser();if(!u)return Response.json({error:'Sign in required'},{status:401});try{return Response.json({order:await reserveCheckout(await req.json(),u)})}catch(e){return Response.json({error:e instanceof CommerceError?e.message:'Checkout temporarily unavailable'},{status:e instanceof CommerceError?e.status:503})}}
