import mongoose, {Schema, model, models} from 'mongoose'

const BookSchema = new Schema({   
    
    userId:  {type: String, required: true},
    title:   {type: String, required: true},
    author:  {type: String, default: 'Unkwown'},
    genre:   {type: String, default: 'General'},
    fileUrl: {type: String, required: true},
    content: {type: String, required: true},  
    createdAt:    {type: Date, default: Date.now}
})

export const Book = models.Book || model ('Book', BookSchema)