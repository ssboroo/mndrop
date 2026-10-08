import {prisma} from './prisma';
import {Prisma} from '@prisma/client';
import {transition,CampaignStatus} from './catalog';
const terminal=['CLOSED','ARCHIVED'];
export async function transitionCampaign(id:string,to:CampaignStatus,actor:string){return prisma.$transaction(async tx=>{
 const c=await tx.campaign.findUniqueOrThrow({where:{id},include:{products:{include:{variants:true}}}});
 if(!transition[c.status as CampaignStatus]?.includes(to))throw Error('Invalid transition; closed drops never reopen');
 const now=new Date();
 if(['UPCOMING','LIVE'].includes(to)){
  if(!c.authorizationId||!c.contentApprovedAt||!c.approvedBy)throw Error('Human approval and authorization evidence are required');
  const evidence=await tx.authorization.findUnique({where:{id:c.authorizationId}});
  if(!evidence||evidence.brand!==c.brand||Date.parse(evidence.validUntil)<now.getTime()||!evidence.approvedBy)throw Error('Brand authorization is not valid');
  if(!c.titleMn||!c.descriptionEn||!c.descriptionMn||!c.refundPolicyEn||!c.refundPolicyMn||!c.sourcingEn||!c.sourcingMn||!c.deliveryEn||!c.deliveryMn||!c.mediaUrl)throw Error('Bilingual approved content, policies and media are required');
  if(!c.products.length||c.products.some(p=>!p.variants.length||!p.ingredientsEn||!p.ingredientsMn||!p.usageEn||!p.usageMn||p.variants.some(v=>v.priceMnt<v.mapMnt||v.priceMnt<=0||v.allocation<=0||v.moq<=0||v.maxPerCustomer<=0)))throw Error('Product, pricing, MAP, allocation and MOQ validation failed');
  if(to==='LIVE'&&(Date.parse(c.opensAt)>now.getTime()||Date.parse(c.closesAt)<=now.getTime()||c.closedAt))throw Error('Campaign is outside its approved purchase window');
  if(c.embargoAt&&c.embargoAt>now)throw Error('Embargo has not lifted');
 }
 const changed=await tx.campaign.updateMany({where:{id,status:c.status},data:{status:to,...(to==='CLOSED'?{closedAt:now.toISOString()}:{})}});if(changed.count!==1)throw Error('Campaign changed. Reload and retry');
 await tx.auditLog.create({data:{actor,action:'CAMPAIGN_TRANSITION',recordId:id,detail:JSON.stringify({from:c.status,to}),createdAt:now.toISOString()}});
 return {id,status:to};
},{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});}
export async function consolidateCampaign(id:string,actor:string){return prisma.$transaction(async tx=>{
 const c=await tx.campaign.findUniqueOrThrow({where:{id},include:{products:{include:{variants:true}}}});
 if(!terminal.includes(c.status))throw Error('Consolidation requires a permanently closed campaign');
 const lines=await tx.orderLine.findMany({where:{order:{campaignId:id,status:'PAID'}}});
 const groups=new Map<string,{sku:string;variant:string;quantity:number;moq:number;moqMet:boolean}>();
 for(const line of lines){const variant=c.products.flatMap(p=>p.variants).find(v=>v.id===line.variantId);if(!variant)throw Error('Variant provenance missing');const key=line.sku+'\u0000'+line.variant;const g=groups.get(key)||{sku:line.sku,variant:line.variant,quantity:0,moq:variant.moq,moqMet:false};g.quantity+=line.quantity;g.moqMet=g.quantity>=g.moq;groups.set(key,g)}
 const quantities=[...groups.values()];if(!quantities.length)throw Error('No verified paid orders');if(quantities.some(g=>!g.moqMet))throw Error('MOQ not met. Human refund or supplier exception workflow required; quantities must not be inflated');
 const existing=await tx.purchaseOrder.findFirst({where:{campaignId:id,status:{not:'CANCELLED'}}});if(existing)return existing;
 const po=await tx.purchaseOrder.create({data:{campaignId:id,quantitiesJson:JSON.stringify(quantities),status:'PREPARED'}});
 await tx.auditLog.create({data:{actor,action:'PURCHASE_ORDER_PREPARED',recordId:po.id,detail:po.quantitiesJson,createdAt:new Date().toISOString()}});return po;
},{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});}
export async function approvePurchaseOrder(id:string,actor:string){return prisma.$transaction(async tx=>{const po=await tx.purchaseOrder.findUniqueOrThrow({where:{id}});if(po.status!=='PREPARED')throw Error('Only prepared purchase orders may be approved');await tx.auditLog.create({data:{actor,action:'PURCHASE_ORDER_APPROVED',recordId:id,detail:'Human approved exact paid quantities. Supplier submission remains separate.',createdAt:new Date().toISOString()}});return tx.purchaseOrder.update({where:{id},data:{status:'APPROVED',approvedBy:actor,approvedAt:new Date()}})})}
export async function closeExpiredCampaigns(){return prisma.$transaction(async tx=>{const due=await tx.campaign.findMany({where:{status:{in:['UPCOMING','LIVE']},closesAt:{lte:new Date().toISOString()}}});for(const c of due){await tx.campaign.update({where:{id:c.id},data:{status:'CLOSED',closedAt:new Date().toISOString()}});await tx.auditLog.create({data:{actor:'system',action:'CAMPAIGN_CLOSED',recordId:c.id,detail:'Approved purchase window expired',createdAt:new Date().toISOString()}})}return {closed:due.length}})}
