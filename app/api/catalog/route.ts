import {catalog} from '@/lib/commerce-store';
export const dynamic='force-dynamic';
export async function GET(){try{return Response.json({drops:await catalog()},{headers:{'Cache-Control':'no-store'}})}catch{return Response.json({error:'Campaign catalog temporarily unavailable'},{status:503})}}
