import journalPosts from './journal-posts.json';
import extraPages from './extra-pages.json';
import cafePhotos from './cafe-photos.json';
import importedMenu from './imported-menu.json';
import menuImageAliases from './menu-image-aliases.json';
import { env } from 'cloudflare:workers';
export type Item = {id:string;kind:string;title:string;titleVi?:string;description?:string;descriptionVi?:string;body?:string;bodyVi?:string;image?:string;category?:string;price?:number;published?:boolean;featured?:boolean;available?:boolean;order?:number;[key:string]:any};
export const defaults:Item[] = [
{id:'quan-su',kind:'page',title:'Café & Bistro',titleVi:'Café & Bistro',description:'38 Quán Sứ, Hoàn Kiếm, Hà Nội',descriptionVi:'38 Quán Sứ, Hoàn Kiếm, Hà Nội',phone:'088 660 04 82',map:'https://maps.app.goo.gl/afDSNDaqyfTDD9R39'},

{id:'home',kind:'page',title:'A little pause.\nA lovely coffee.',titleVi:'Chậm một chút.\nThêm một chút cà phê.',description:'Vietnamese favourites, freshly brewed coffee, and a warm welcome in Hanoi’s Old Quarter. Take a seat. Make yourself at home.',descriptionVi:'Cà phê Việt, những món ngon thân quen và một góc nhỏ ấm áp giữa phố cổ Hà Nội. Ghé vào, chọn chỗ ngồi và thư giãn.',image:'/assets/cafe/cafe-lounge.jpg'},
{id:'workshop',kind:'page',title:'Learn. Whisk. Sip.',titleVi:'Học. Đánh trứng. Thưởng thức.',description:'Make your own Vietnamese egg coffee in a hands-on session at Drop In Café & Bistro. Contact us to arrange your visit.',descriptionVi:'Tự tay pha cà phê trứng Việt Nam tại Drop In Café & Bistro. Liên hệ với chúng mình để đặt lịch.',price:390000,image:'/workshop.png'},
...importedMenu,
...cafePhotos,
...extraPages,
...journalPosts
];
export function db(){if(!env.DB)throw Error('Content storage unavailable');return env.DB;}
export async function allContent():Promise<Item[]>{const rows=await db().prepare('SELECT id,kind,data FROM content').all<{id:string;kind:string;data:string}>();const stored=rows.results.map(r=>({...JSON.parse(r.data),id:r.id,kind:r.kind}));const ids=new Set(stored.map(r=>r.id));return [...defaults.filter(r=>!ids.has(r.id)),...stored].map(r=>({...r,image:r.id==='home'&&(!r.image||r.image==='/workshop.png') ? '/assets/cafe/cafe-lounge.jpg' : r.image ? (menuImageAliases as Record<string,string>)[r.image] ?? r.image : r.image})).filter(r=>!r.deleted&&r.id!=='phung-hung'&&r.id!=='salt-coffee').sort((a,b)=>(a.order??0)-(b.order??0));}
export async function saveItem(item:Item){await db().prepare('INSERT INTO content (id,kind,data) VALUES (?,?,?) ON CONFLICT(id) DO UPDATE SET kind=excluded.kind,data=excluded.data').bind(item.id,item.kind,JSON.stringify(item)).run();}
