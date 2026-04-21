import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import {Book} from "@/models/Book";
import {BookOpen, Plus} from 'lucide-react'
import Link from "next/link";
import UploadModal from '@/components/UploadModal';


export default async function LibraryPage() {

    const {userId} = await auth()
    if (! userId) redirect('/sign-in')

await connectDB()
const books = await Book.find({userId})
                        .sort({createdAt:-1})   
                        .lean();


return (   

    <main className="min-h-screen bg-[#F5EFE4] pt-7">

<div className='mx-8 mt-6 bg-[#EDE3D0] rounded-2xl p-8
            flex items-center justify-between'> 

            <div>
                <h1 className="font-serif text-4xl font-bold
                                text-[#1a1a1a] mb-3">
                Your Library
                                </h1>
                <p className="text-[#7a5a4a] text-sm
                                leading-relaxed max-w-sm">
                                    Upload any PDF and have a real voice
                                    conversation with its content.
                                </p>
                                <button className="mt-6 bg-[#6B3A2A] text-[#F5EFE4]
                                                    px-6 py-3 rounded-xl font-medium
                                                    hover:bg-[#4a2518] transition-all">
                                    <Plus size={16}/>
                                    Add new book
                                                    </button>
            </div>

<div className='bg-white rounded-xl p-5 min-w-[200px]
                shadow-sm border border-[#E2D8C8]'>

{[
    {num:'1', title: 'upload PDF', sub: 'File or URL'},
    {num:'2', title: 'AI Processing', sub: 'We analyse content'},
    {num:'3', title: 'Voice Chat', sub: 'Discuss with AI'},

].map(step => (
            <div key={step.num}
            className='flex items-start gap-3 py-2
            border-b border-[#F0EAE0] last:border-0'>

            <div className='w-6 h-6 rounded-full border-2
                            border-[#6B3A2A] flex items-center
                            justify-center text-[#6B3A2A]
                            text-xs font-bold flex-shrink-0'>
                {step.num}
            </div>
            <div>
                <div className='text-xs font-medium text-[#1a1a1a]'>
                    {step.title}
                </div>
                <div className='text-xs text-[#7a5a4a]'>
                    {step.sub}
                </div>
            </div>
            </div>
))}
</div>
</div>

<div className="px-8 py-8">
    <h2 className="font-serif text-xl font-semibold
                text-[#1a1a1a] mb-6">
                    Your Books
                </h2>

                {books.length === 0? (

                    <div className="flex flex-col items-center
                                    justify-center py-24 text-center">

                                <div className="w-16 h-16 bg-[#EDE3D0] rounded-2xl
                                                flex items-center justify-center mb-4">

                                <BookOpen size={28} color='#6B3A2A' />
                                                </div>
                                <h3 className="font-serif text-xl font-bold
                                                text-[#1a1a1a] mb-2">
                                                    No Books yet
                                                </h3>

                                                <p className="text-sm text-[#7a5a4a] max-w-sm mb-6">
                                                    upload your first PDF to get started
                                                </p>

                                                <div>
                                                    <UploadModal/>
                                                </div>
                                    </div>
                ) : (

                <div className="grid grid-cols-2 md:grid-cols-3
                                lg:grid-cols-4 gap-6">
                            {books.map((book: any) =>(
                                <Link
                                    key={book._id.toString()}
                                    href={`/library/${book._id}`}>
                                    <div className="bg-white rounded-xl border 
                                                    border-[#EFD8C8] overflow-hidden
                                                    cursor-pointer hover:shadow-md
                                                    hover:-translate-y-1 transition-all">
                                    
                                    <div className="w-full h-48 bg-[#6B3A2A]
                                                    flex items-center justify-center">
                                    <BookOpen size={40} color='#C8A97E'/>                                                 
                                                    </div>
                                    <div className="p-4">
                                    <h3 className="font-medium text-[#1a1a1a]
                                                    text-sm mb-1 truncate">
                                    {book.title}                             
                                    </h3>
                                    <p className="text-xs text-[#7a5a4a] truncate">{book.author}</p>
                                    
                                    <span className="inline-block mt-2 text-xs
                                                    bg-[#E8F4ED] text-[#2D7A4F]
                                                    px-2 py-1 rounded-full">
                                                    Ready to chat 
                                                    </span>                            
                                    </div>                                                             
                                    </div>
                                </Link>
                                
                                
                        ))}
                                </div>
                    )}
</div>
</main>
)
}
