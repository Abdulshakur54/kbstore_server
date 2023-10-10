import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()
const url = process.env.MONGO_URI
const connection = async ()=>{
    const client = new MongoClient(url)
    const conn = await client.connect()
    console.log('Connected')
    return conn; 
}

export default await connection()
