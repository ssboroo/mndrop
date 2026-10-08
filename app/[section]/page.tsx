import BeautyApp from '../beauty-app';
import {notFound} from 'next/navigation';
export default async function Page({params}:{params:Promise<{section:string}>}){const {section}=await params;if(!['drops','upcoming','brands','how-it-works','archive','account','admin','stories','wishlist','support','policies'].includes(section))notFound();return <BeautyApp view={section}/>}
