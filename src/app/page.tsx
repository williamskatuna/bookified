import Link from 'next/link'
import {BookOpen, Mic, FileText, Star, File} from 'lucide-react'

export default function Home() {

  return (
    <main className='min-h-screen bg-[#F5EFE4]'>
      
      {/* Hero */}
      <section className='max-w-4xl mx-auto px-8 pt-24 pb-16 text-center'>
      
      <div className='inline-flex items-center gap-2 bg-[#EDE3D0]
      text-[#6B3A2A] text-sm font-medium px-4 py-2
      rounded-full mb-8'>
        <Star size={14}/>
        First 20 users get Pro free for 2 months
      </div>
      
      <h1 className='font-serif text-5xl font-bold text-[#1a1a1a]
      leading-tight mb-6'>
        Talk to your books.<br/>
        <span className='text-[#6B3A2A]'>Actually understand them.</span>
      </h1>
      

      <p className='text-lg text-[#7a5a4a] max-w-2x1 mx-auto mb-10 
      leading-relaxed'>
      Upload any PDF and have a real voice conversation with its content.
      Take notes, save insights, and never forget what you read.     
      </p>

      <div className='flex items-center justify-center gap-4'>
        <Link href="/sign-up"
              className='bg-[#6B3A2A] text-[#F5EFE4] px-3 py-3
                        rounded-xl font-medium text-base
                        hover:bg-[#4a2518] transition-all'>
                          Get started free
        </Link>

        <Link href='/pricing' 
              className='border-2 border-[#6B3A2A] text-[#6B3A2A]
              px-8 py-3 rounded-xl font-medium text-base
              hover:bg-[#EDE3D0] transition-all'>
              
              See pricing
              </Link>
      </div>
      </section>

       {/*   HOW IT WORKS */}

        <section className='max-w-4xl mx-auto px-8 py-16'>
          <h2 className='font-serif text-3xl font-bold text-center
                        text-[#1a1a1a] mb-12'>


          How it works
          </h2>

          <div className='grid grid-cols-3 gap-8'>
            {[
              
            {
              icon: <FileText size={24} color='#6B3A2A'/>,
              step:'01',
              title:'Upload your PDF',
              desc: 'Drop in any book, paper, or document. We extract the full text instantly.'
            },

            {
              icon: <BookOpen size={24} color='#6B3A2A'/>,
              step:'02',
              title:'AI reads it',
              desc: 'Our AI processes the content and gets ready to discuss it with you in depth.'
            },

            {
              icon: <Mic size={24} color='#6B3A2A'/>,
              step:'03',
              title:'Have a conversation',
              desc: 'Ask questions, get summaries, explore ideas — all through natural voice chat.'
            },
        
            ].map(item => (
              <div key={item.step}
                  className='bg-white rounded-2xl p-8 border
                            border-[#E2D8C8] text-center'>
                              <div className='w-12 h-12 bg-[#EDE3D0] rounded-xl
                                              flex items-center justify-center mx-auto mb-4'>
                              {item.icon}
                              </div>
                              <div className='text-xs font-bold text-[#C8A97E]
                                    tracking-widest mb-2'>
                                      STEP {item.step}
                                    </div>
                                    <h3 className='font-serif text-lg font-bold text-[#1a1a1a] mb-3'>
                                      {item.title}
                                    </h3>
                                    <p className='text-sm text-[#7a5a4a] leading-relaxed'>
                                      {item.desc}
                                    </p>           
          </div>
          ))}
          </div>
        </section>
      {/* FOOTER */}
      <footer className='text-center py-8 text-sm text-[#7a5a4a]
                        border-t border-[#E2D8C8]'>
                                  © 2026 Bookified · Built with Next.js, MongoDB, Vapi & Stripe
                        </footer>
      </main>
  )
}
