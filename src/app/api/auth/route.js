const mongodb = require('mongodb')

export function POST(req){
    return new Response(JSON.stringify({name: "Post use name "}))
}

export async function GET(req){
    try{
        const url = "mongodb+srv://bahadoriui:Admin0419@ete-next-app.s71nt.mongodb.net/"
        const client = mongodb.MongoClient;
        const server = await client.connect(url);
        const db= server.db('sm-tsx');
        const collection= db.collection("students");
        const res=await collection.find({}).toArray();
        return new Response(JSON.stringify(res))

    }catch(error){
        console.error('mongodb connection error', error)
    }
}