'use client';
import {useEffect,useState} from 'react';
export default function Countdown({target,mn=false,compact=false,closed=false}:{target:string;mn?:boolean;compact?:boolean;closed?:boolean}){
 const [now,setNow]=useState<number|null>(null);
 useEffect(()=>{setNow(Date.now());const timer=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer)},[]);
 const remaining=now===null?null:Math.max(0,Math.floor((Date.parse(target)-now)/1000));
 if(closed||remaining===0)return <div className="countdown-ended">{mn?'ДРОП ХААГДСАН':'DROP CLOSED'}</div>;
 const values=remaining===null?[null,null,null,null]:[Math.floor(remaining/86400),Math.floor(remaining/3600)%24,Math.floor(remaining/60)%60,remaining%60];
 return <div className={'countdown '+(compact?'compact':'')} role="timer" aria-label={mn?'Үлдсэн хугацаа':'Time remaining'}>{values.map((v,i)=><div key={i}><span>{v===null?'—':String(v).padStart(2,'0')}</span><small>{(mn?['ӨДӨР','ЦАГ','МИН','СЕК']:['DAYS','HRS','MIN','SEC'])[i]}</small></div>)}</div>;
}
