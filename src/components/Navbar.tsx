'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import {UserButton, useUser} from "@clerk/nextjs"
import {BookOpen} from 'lucide-react'


const links= [
    {label: 'Library',     href: '/library' },
    {label: 'Notes',       href: '/notes' },
    {label: 'Transcripts', href: '/transcripts' },
    {label: 'Pricing',     href: '/pricing' },
    
]

export default function Navbar(){
    const pathname = usePathname()
    const {isSignedIn} = useUser()

    return(

        <nav className="w-full h-14 bg-[#6B3A2A] border-b border-[#4a2528] flex items-center justify-between px-8 sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-2
            text-[#F5EFE4] font-bold text-lg">
                <BookOpen size={20} color="#C8A97E"/>
                Bookified    
            </Link>

            {isSignedIn &&
            <div className="flex items-center gap-1">
                {links.map(link => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className={` 
                        px-4 py-2 rounded-md text-sm font-medium transition-all
                        ${pathname === link.href
                            ? 'bg-white/20 text-white'
                            : 'text-[#F5EFE4] opacity-75 hover:bg-white/10 hover:opacity-100'
                        }
                        
                    `}
                    >
                    {link.label}  
                    </Link>               
                    
                ))}
                


            </div>
            
            
            }

            <UserButton afterSignOutUrl="/"/>

        </nav>
    )


}