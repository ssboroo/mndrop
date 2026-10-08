import BeautyApp from '../../beauty-app';
export const metadata={title:'Your order — BEAUTY DROP MONGOLIA',robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{id:string}>}){return <BeautyApp view="order" slug={(await params).id}/>}
