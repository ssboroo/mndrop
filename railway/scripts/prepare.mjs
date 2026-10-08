import {cp,rm,mkdir,writeFile,readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');const target=path.join(root,'railway');
for(const name of ['app','lib','public','db']){await rm(path.join(target,name),{recursive:true,force:true});await cp(path.join(root,name),path.join(target,name),{recursive:true});}
await rm(path.join(target,'components'),{recursive:true,force:true});await mkdir(path.join(target,'components/ui'),{recursive:true});
for(const name of ['sheet','dialog','tabs','select','button'])await cp(path.join(root,'components/ui/'+name+'.tsx'),path.join(target,'components/ui/'+name+'.tsx'));
await cp(path.join(target,'overrides'),target,{recursive:true});
for(const file of ['app/api/admin/route.ts','app/api/checkout/route.ts','app/api/payments/callback/route.ts','app/api/operations/route.ts'])await cp(path.join(root,file),path.join(target,file));
await writeFile(path.join(target,'next-env.d.ts'),'/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n');
await rm(path.join(target,'db/index.ts'),{force:true});
for(const name of ['connectors.ts','connector-context.ts','connector-contract.mts','connector-contract.mjs','connector-preview.d.ts','connector-errors.mts'])await rm(path.join(target,'lib',name),{force:true});
const customerFile=path.join(target,'app/api/customer/route.ts');let customerSource=await readFile(customerFile,'utf8');customerSource=customerSource.replaceAll('user:null,items:','authMode:"email",user:null,items:').replaceAll('user:{email:user.email','authMode:"email",user:{email:user.email');await writeFile(customerFile,customerSource);
console.log('Prepared shared editorial app with PostgreSQL and email-auth runtime.');
