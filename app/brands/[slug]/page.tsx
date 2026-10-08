import BeautyApp from '../../beauty-app';
import {catalog} from '@/lib/commerce-store';
import {drops as concepts} from '@/lib/catalog';
import {findDirectoryBrand} from '@/lib/brand-directory';
import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const initialCatalog=(findDirectoryBrand(slug)||concepts.some(d=>d.brand===slug))?concepts:await catalog();if(!findDirectoryBrand(slug)&&!initialCatalog.some(d=>d.brand===slug))notFound();return <BeautyApp key={slug} view="brand" slug={slug} initialCatalog={initialCatalog}/>}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const b=findDirectoryBrand(slug);return b?{title:b.name+" | BEAUTY DROP MONGOLIA Brand Directory",description:"Explore "+b.name+" in the independent BEAUTY DROP MONGOLIA beauty directory. Official partnership and approved drops are not implied."}:{}}
