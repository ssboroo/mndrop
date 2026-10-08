import test from 'node:test';
import assert from 'node:assert/strict';
import {effectiveStatus,canPurchase,drops} from '../lib/catalog.ts';
test('Railway preserves exact time and irreversible closure rules',()=>{const d={...drops[0],approved:true};const end=Date.parse(d.closesAt);assert.equal(canPurchase(d,end-1),true);assert.equal(canPurchase(d,end),false);assert.equal(effectiveStatus(d,end),'CLOSED');assert.equal(canPurchase({...d,status:'CLOSED',closesAt:'2030-01-01T00:00:00Z'},end-1),false)});
