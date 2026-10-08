import type {CommerceDrop} from './commerce-types';
export const campaignWorlds=[
 {key:'petal',title:'GLASS CONSERVATORY',mn:'Шилэн цэцэрлэг',light:'#ffc8db'},
 {key:'blue',title:'THE CHROME TIDE',mn:'Хромон давалгаа',light:'#8acaff'},
 {key:'rose',title:'THE SILK SALON',mn:'Торгон салон',light:'#e5a2bb'},
 {key:'gold',title:'GOLDEN HORIZON',mn:'Алтан хаяа',light:'#ffd18c'},
 {key:'pearl',title:'ABOVE THE CLOUDS',mn:'Үүлсийн дээр',light:'#d8d0ff'},
] as const;
export function campaignWorldIndex(drop:CommerceDrop){return Math.max(0,Math.min(4,drop.environment??['pink','blue','rose','gold','gray'].indexOf(drop.tone)))}
// Original editorial concept sets. Never present these as approved supplier assets.
export function campaignBackdrop(drop:CommerceDrop){return drop.approved?drop.content?.campaignImages?.[0]:'/worlds/'+campaignWorlds[campaignWorldIndex(drop)].key+'.webp'}
