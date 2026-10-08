'use client';
import type {AnchorHTMLAttributes} from 'react';
// Native document navigation keeps dynamic routes, open drawers and server-rendered
// catalog pages consistent across both hosting runtimes. It also works before JS.
export default function SiteLink({href,...props}:AnchorHTMLAttributes<HTMLAnchorElement> & {href:string}){return <a href={href} {...props}/>}
