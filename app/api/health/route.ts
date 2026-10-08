import {one} from '@/lib/commerce-store';
export async function GET(){try{await one('SELECT COUNT(*) AS count FROM commerce_content');return Response.json({status:'ok'},{headers:{'Cache-Control':'no-store'}})}catch{return Response.json({status:'unavailable'},{status:503})}}
