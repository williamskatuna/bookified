import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { connectDB } from "@/lib/mongodb";
import {Book} from "@/models/Book";
import { PDFParse } from 'pdf-parse'
import { put } from '@vercel/blob'


export async function POST(request: Request) {

const {userId} = await auth()

if (!userId){

    return NextResponse.json(
        {error: 'Unauthorised'},
        {status: 401}

    )
} 
    try {
        await connectDB()

        const formData = await request.formData()
        const file = formData.get('file') as File

        if(!file) {
            return NextResponse.json(
            {error: 'No file provided'},
            {status: 400}
            )
        }

        const buffer = Buffer.from(await file.arrayBuffer())
            const parser = new PDFParse({data: buffer })
            const result = await parser.getText()
            const content = result.text

            await parser.destroy()

            const blob = await put(
                `books/${Date.now()}-${file.name}`,
                file,
                {
                    access: 'public',
                    addRandomSuffix: true,
                }
            )
            const title = file.name.replace('.pdf','')
            
            const book = await Book.create({
                userId,
                title,
                content,
                fileUrl: blob.url,
            })

              return NextResponse.json(
                {book},
                {status: 201}
                    
                )



} catch (err) {

    return NextResponse.json(
        {error: 'upload failed'},
        {status: 500}
    )
}



}