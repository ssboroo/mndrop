export type ApprovedFeed={partnerId:string;campaigns:unknown[];receivedAt:string;sourceReference:string};
export interface PartnerAdapter {
 kind:'REST'|'GRAPHQL'|'SHOPIFY'|'EDI'|'CSV'|'XML'|'JSON'|'SFTP'|'PORTAL'|'EMAIL';
 fetchLaunches():Promise<ApprovedFeed>;
 submitPurchaseOrder(input:{id:string;approvedBy:string;approvedAt:string;quantities:{sku:string;variant:string;quantity:number}[]}):Promise<{supplierReference:string}>;
 fetchTracking(reference:string):Promise<{trackingNumber:string;status:string}>;
}
export class PartnerRegistry {
 private adapters=new Map<string,PartnerAdapter>();
 register(authorizedPartnerId:string,adapter:PartnerAdapter){if(!authorizedPartnerId)throw Error('Partner authorization ID required');this.adapters.set(authorizedPartnerId,adapter)}
 get(id:string){const a=this.adapters.get(id);if(!a)throw Error('No approved integration configured for this partner');return a;}
}
// Protocol support is an adapter contract, not fabricated live integrations.
// Imports stage content for human review. An adapter never publishes a campaign.
export function stageJsonFeed(raw:string,partnerId:string):ApprovedFeed {if(raw.length>1_000_000)throw Error('Feed too large');const data=JSON.parse(raw);if(!partnerId||!Array.isArray(data.campaigns)||data.campaigns.length>100)throw Error('Invalid partner feed');return {partnerId,campaigns:data.campaigns,receivedAt:new Date().toISOString(),sourceReference:typeof data.reference==='string'?data.reference.slice(0,200):'JSON_IMPORT'};}
export const partners=new PartnerRegistry();
