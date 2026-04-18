import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!

interface MongooseCache {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose > | null 
}

declare global {
    var mongoose: MongooseCache
}


const cached: MongooseCache = global.mongoose ?? {
    conn: null,
    promise: null
}

export async function connectDB(){
    if (cached.conn) return cached.conn

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI)
    }
    
    cached.conn =await cached.promise
    global.mongoose = cached
    return cached.conn
}