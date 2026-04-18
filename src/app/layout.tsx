import type {Metadata} from 'next'
import {ClerkProvider} from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bookified',
  description: 'Talk to your books',
}

export default function RootLayout({

  children,

}: {
  children: React.ReactNode

}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className='bg-[#F5EFE4] min-h-screen'>           
          <Navbar/>
          {children}
        </body>


      </html>

    </ClerkProvider>



  )

}







