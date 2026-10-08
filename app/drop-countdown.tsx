'use client';
import {useEffect,useState} from 'react';
export default function Countdown({target,mn=false,compact=false,closed=false,cinematic=false,phase='closing'}:{target:string;mn?:boolean;compact?:boolean;closed?:boolean;cinematic?:boolean;phase?:'opening'|'closing'}){
 const [now,setNow]=useState<number|null>(null);
 useEffect(()=>{setNow(Date.now());const timer=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer)},[target]);
 const timestamp=Date.parse(target),remaining=now===null||!Number.isFinite(timestamp)?null:Math.max(0,Math.ceil((timestamp-now)/1000));
 if(closed||remaining===0)return <div className={'countdown-ended '+(cinematic?'cinematic-ended':'')}>{closed||phase==='closing'?(mn?'ДРОП ХААГДСАН':'DROP CLOSED'):(mn?'НЭЭГДЭХ ЦАГ БОЛЛОО':'OPENING TIME REACHED')}</div>;
 const values=remaining===null?[null,null,null,null]:[Math.floor(remaining/86400),Math.floor(remaining/3600)%24,Math.floor(remaining/60)%60,remaining%60];
 return <div className={'countdown '+(compact?'compact ':'')+(cinematic?'cinematic-countdown':'')} role="timer" aria-live="off" aria-label={mn?'Үлдсэн хугацаа':'Time remaining'}>{values.map((v,i)=><div className="countdown-unit" key={i}><div className="countdown-face"><span className="countdown-value" key={String(v)}>{v===null?'—':String(v).padStart(2,'0')}</span></div><small>{(mn?['ӨДӨР','ЦАГ','МИН','СЕК']:['DAYS','HOURS','MIN','SEC'])[i]}</small></div>)}</div>;
}
