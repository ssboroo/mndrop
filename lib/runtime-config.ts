import {env} from 'cloudflare:workers';
export function configuration(){return env as unknown as Record<string,string|undefined>}
