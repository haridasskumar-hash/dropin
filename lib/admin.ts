import {getChatGPTUser} from '@/app/chatgpt-auth';
import {env} from 'cloudflare:workers';
export async function isAdmin(){const user=await getChatGPTUser();const allowed=(env as any).ADMIN_EMAIL;return !!(user&&allowed&&user.email.toLowerCase()===allowed.toLowerCase());}
export function sameOrigin(r:Request){return r.headers.get('origin')===new URL(r.url).origin;}
