import {spawn} from 'node:child_process';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p',process.env.PORT||'3000'],{stdio:'inherit'});
let stopped=false,timer;
async function tick(){if(stopped)return;if(process.env.JOB_SECRET&&process.env.JOB_WORKER_ENABLED!=='false'){try{const r=await fetch('http://127.0.0.1:'+(process.env.PORT||'3000')+'/api/jobs/process',{method:'POST',headers:{Authorization:'Bearer '+process.env.JOB_SECRET},signal:AbortSignal.timeout(55000)});if(!r.ok)console.error('Commerce job run unavailable; will retry')}catch{console.error('Commerce job endpoint unavailable; will retry')}}if(!stopped)timer=setTimeout(tick,60000)}
timer=setTimeout(tick,10000);
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{stopped=true;clearTimeout(timer);server.kill(signal)});
server.on('exit',code=>{stopped=true;clearTimeout(timer);process.exit(code??1)});
