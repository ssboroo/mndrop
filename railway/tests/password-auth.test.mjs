import test from 'node:test';
import assert from 'node:assert/strict';
import {hashPassword,verifyPassword,validPassword} from '../overrides/lib/password-auth.ts';
test('passwords require bounded long input',()=>{assert.equal(validPassword('short'),false);assert.equal(validPassword('a'.repeat(12)),true);assert.equal(validPassword('a'.repeat(129)),false);assert.equal(validPassword(null),false)});
test('scrypt salts each password and verifies without accepting incorrect secrets',async()=>{const first=await hashPassword('a sufficiently long secret');const second=await hashPassword('a sufficiently long secret');assert.notEqual(first,second);assert.equal(await verifyPassword('a sufficiently long secret',first),true);assert.equal(await verifyPassword('incorrect password',first),false);assert.equal(await verifyPassword('a sufficiently long secret','invalid'),false);assert.ok(!first.includes('sufficiently'))});
import {readAuthBody} from '../overrides/lib/auth-request.ts';
test('auth bodies enforce streaming and declared limits',async()=>{assert.equal(await readAuthBody(new Request('https://example.test',{method:'POST',body:'{"ok":true}'})),'{"ok":true}');await assert.rejects(readAuthBody(new Request('https://example.test',{method:'POST',headers:{'content-length':'99999'},body:'{}'})),/BODY_TOO_LARGE/);await assert.rejects(readAuthBody(new Request('https://example.test',{method:'POST',body:'x'.repeat(5000)})),/BODY_TOO_LARGE/)});
import {acceptsRegistrationTerms,registrationTermsVersion} from '../overrides/lib/auth-request.ts';
test('registration consent requires explicit boolean acceptance and version',()=>{assert.equal(acceptsRegistrationTerms(true),true);for(const value of [false,undefined,null,'true',1,{}])assert.equal(acceptsRegistrationTerms(value),false);assert.equal(registrationTermsVersion,'2026-10-08')});
import {claimVerifiedEmail} from '../overrides/lib/email-ownership.ts';
test('first email ownership claim removes pre-registration password and every session',async()=>{
 const state={user:{id:'victim',email:'victim@example.com',passwordHash:'attacker-password',emailVerifiedAt:null},sessions:[{userId:'victim',tokenHash:'attacker-session'},{userId:'other',tokenHash:'unrelated'}],locked:false};
 const tx={user:{upsert:async()=>state.user,findUniqueOrThrow:async()=>state.user,update:async({data})=>{assert.equal(state.locked,true);assert.equal(state.sessions.some(s=>s.userId==='victim'),false);Object.assign(state.user,data);return state.user}},$queryRaw:async()=>{state.locked=true},session:{deleteMany:async({where})=>{state.sessions=state.sessions.filter(s=>s.userId!==where.userId)}}};
 const user=await claimVerifiedEmail(tx,'victim@example.com');
 assert.equal(user.passwordHash,null);assert.ok(user.emailVerifiedAt instanceof Date);assert.deepEqual(state.sessions,[{userId:'other',tokenHash:'unrelated'}]);
});
test('verified email login preserves owner password and sessions',async()=>{
 const user={id:'owner',email:'owner@example.com',passwordHash:'owner-password',emailVerifiedAt:new Date()};let mutated=false;
 const tx={user:{upsert:async()=>user,findUniqueOrThrow:async()=>user,update:async()=>{mutated=true}},$queryRaw:async()=>{},session:{deleteMany:async()=>{mutated=true}}};
 assert.equal(await claimVerifiedEmail(tx,user.email),user);assert.equal(mutated,false);assert.equal(user.passwordHash,'owner-password');
});
