import {timingSafeEqual} from 'node:crypto';
import {closeExpiredCampaigns} from '@/lib/operations';
export async function POST(req:Request){const value=req.headers.get('authorization')||'',expected=process.env.JOB_SECRET?'Bearer '+process.env.JOB_SECRET:'';if(!expected||value.length!==expected.length||!timingSafeEqual(Buffer.from(value),Buffer.from(expected)))return Response.json({error:'Unauthorized'},{status:401});try{return Response.json(await closeExpiredCampaigns())}catch{return Response.json({error:'Campaign closure job unavailable'},{status:503})}}
