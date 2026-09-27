import type {Metadata} from 'next';import './globals.css';
export const metadata:Metadata={title:{default:'Drop In Café & Bistro | Hanoi',template:'%s | Drop In Café'},description:'Vietnamese coffee, café favourites and egg coffee workshops in Hanoi’s Old Quarter. Visit Drop In Café & Bistro at 38 Quán Sứ, Hoàn Kiếm, Hanoi.',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
