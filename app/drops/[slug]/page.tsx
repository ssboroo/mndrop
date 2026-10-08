import BeautyApp from '../../beauty-app';
import {publicDrop,catalog} from '@/lib/commerce-store';
export const dynamic='force-dynamic';
import {drops as concepts} from '@/lib/catalog';
import {notFound} from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const d=concepts.find(d=>d.id===slug)||await publicDrop(slug);return {title:d?`${d.name} — BEAUTY DROP`:'Drop not found',description:d?.description};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const initialCatalog=concepts.some(d=>d.id===slug)?concepts:await catalog();if(!initialCatalog.some(d=>d.id===slug))notFound();return <BeautyApp key={slug} view="detail" slug={slug} initialCatalog={initialCatalog}/>}
