import BeautyApp from '../../beauty-app';
import {catalog} from '@/lib/commerce-store';
import {drops as concepts} from '@/lib/catalog';
import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const initialCatalog=concepts.some(d=>d.brand===slug)?concepts:await catalog();if(!initialCatalog.some(d=>d.brand===slug))notFound();return <BeautyApp key={slug} view="brand" slug={slug} initialCatalog={initialCatalog}/>}
