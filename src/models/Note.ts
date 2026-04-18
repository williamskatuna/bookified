import mongoose, {Schema, model, models} from "mongoose";

const NoteSchema = new Schema({
    userId:  {type: String, required: true},
    bookId:  {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    title:   {type: String, required: true},
    content: {type: String, default: ''},  
    createdAt: {type: Date, default: Date.now}
})

export const Note = models.Note || model('Note', NoteSchema)

