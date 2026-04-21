'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import{
    Upload,
    X,
    FileText,
    Link,
    Loader2,
    AlertCircle,
} from 'lucide-react'

export default function UploadModal() {

    const router = useRouter()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [file, setFile] = useState<File  | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [activeTab, setActiveTab] = useState<'file' | 'url'>('file')


    async function handleUpload() {

    if (!file) {
        setError('Please choose a PDF file first')
        return
    }

    setLoading(true)
    setError('')

    try {

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/books/upload', {
            method: 'POST',
            body: formData,
        })


    if (!response.ok) {
        throw new Error('Upload failed')
        }
    
    
    setIsOpen(false)
    setFile(null)
    router.refresh()

} catch (err) {

    setError('Upload failed. Please try again.')
    
} finally {

    setLoading(false)
    }

}

    
    
    
    return (

    <div>
        {/* BUTTON */}
        <button 
        onClick={() => setIsOpen(true)}
        className='bg-[#6B3A2A] text-[#F5EFE4]
                    px-6 py-3 rounded-xl font-medium
                    text-sm flex items-center gap-2
                    hover:bg-[#4a2518] transition-all'>
        <Upload size={16} />
        Add new book
        </button>
        
       {/* MODAL */}
        {isOpen && (
                <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center'
                                onClick={() => setIsOpen(false)}>

                                <div className='relative bg-white rounded-2xl p-8 w-[460px]'
                                onClick={e => e.stopPropagation()}>

                                <button
                                onClick={() => setIsOpen(false) }
                                className='absolute top-4 right-4 
                                hover:opacity-70 transition-opacity'>
                                    

                                <X size={20} />
                                
                                </button>

                                <h2 className='font-serif text-2xl font-bold text-[#1a1a1a] mb-6'>
                                    Add a new book
                                </h2>

                                   {/* TABS */}
                                    <div className='flex gap-2 mb-6'>
                                        <button
                                        onClick={() => setActiveTab('file')}
                                        className={`flex items-center gap-2 px-4 py-2
                                                    rounded-lg text-sm font-medium transition-all
                                                    ${activeTab === 'file'
                                                        ? 'bg-[#6B3A2A] text-[#F5EFE4]'
                                                        : 'bg-[#F5EFE4] text-[#6B3A2A]'
                                                    }`}>
                                        <FileText size={14}/>

                                        Upload PDF
                                        </button>

                                        <button 
                                        onClick={() => setActiveTab('url')}
                                        className={`flex items-center gap-2 px-4 py-2
                                                    rounded-lg text-sm font-medium transition-all
                                                    ${activeTab === 'url'
                                                        ? 'bg-[#6B3A2A] text-[#F5EFE4]'
                                                        : 'bg-[#F5EFE4] text-[#6B3A2A]'
                                                    }`}>
                                        <Link size={14}/>
                                        Paste URL
                                        </button>
                                    </div>

                                    {/* FILE TAB */}

                                    

                                    {activeTab === 'file' && (
                                        <div className='border-2 border-dashed
                                        border-[#E2D8C8] rounded-xl
                                        p-8 text-center mb-6'> 
                                        <Upload size={32}
                                                color='#6B3A2A'
                                                className='mx-auto mb-3'/>

                                                <p className='text-sm text-[#7a5a4a] mb-3'>
                                                Drop your PDF here or click to browse
                                                </p>
                                                <input type="file"
                                                        accept='.pdf'
                                                        onChange={e => setFile(e.target.files?.[0] || null)}
                                                        className='hidden'
                                                        id='file-upload'
                                                        />

                                                        <label 
                                                        htmlFor="file-upload"
                                                        className='cursor-pointer bg-[#F5EFE4] text-[#6B3A2A] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#EDE3D0] transition-all'>
                                                        Choose PDF
                                                        </label>
                                                        {file && ( 
                                                            <p className='mt-3 text-sm text-[#6B3A2A] font-medium'>
                                                                ✅ {file.name}
                                                            </p>
                                                            )}
                                                        
                                                        </div>        
                                        )}
                                                        {/* URL TAB */}
                                                        {activeTab === 'url' && (
                                                        <div className='mb-6'>
                                                                <input type="text" 
                                                                    placeholder='https://example.com/book.pdf'
                                                                    className='w-full border border-[#E2D8C8]
                                                                    rounded-xl px-4 py-3 text-sm
                                                                    focus:outline-none focus:border-[#6B3A2A]'
                                                                    />
                                                                    
                                                            </div>
                                                            )}

                                                            {/* ERROR */}
                                                            {error && ( 
                                                                <div className='flex items-center gap-2
                                                                text-red-500 text-sm mb-4'>
                                                                <AlertCircle size={16}/>
                                                                {error}
                                                                </div>
                                                                )}
                                                                
                                                                {/* ACTION BUTTONS */}
                                                                <div className='flex gap-3 justify-end'>
                                                                    <button
                                                                    onClick={() => setIsOpen(false)}
                                                                    className='px-4 py-2 text-sm text-[#7a5a4a]
                                                                    hover:text-[#1a1a1a] transition-colors'>

                                                                        Cancel

                                                                    </button>

                                                                <button 
                                                                    onClick={handleUpload}
                                                                    disabled={loading}
                                                                    className='bg-[#6B3A2A] text-[#F5EFE4]
                                                                    px-6 py-3 rounded-xl font-medium
                                                                    text-sm flex items-center gap-2
                                                                    hover:bg-[#4a2518] transition-all
                                                                    disabled:opacity-50'>
                                                                    
                                                                {loading ? ( 
                                                                    <>
                                                                    <Loader2 size={16} className='animate-spin'/>
                                                                    Uploading...
                                                                    </>
                                                                ) : ( 
                                                                    <>
                                                                        <Upload size={16} />
                                                                        Upload & Save
                                                                        </>
                                                                        )}
                                                                </button>


                                                                </div>
                                        




                                
                            </div>
                
                </div>
                
                
                
                
            )}     
    
    </div>





    )
    }



























