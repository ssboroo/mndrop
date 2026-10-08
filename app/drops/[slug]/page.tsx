import BeautyApp from '../../beauty-app';
import {drops} from '@/lib/catalog';
import {notFound} from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const d=drops.find(d=>d.id===slug);return {title:d?`${d.name} — BEAUTY DROP`:'Drop not found',description:d?.description};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!drops.some(d=>d.id===slug))notFound();return <BeautyApp view="detail" slug={slug}/>}
