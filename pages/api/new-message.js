//  /api/new-message

//UTILS
import connectDB from '../../utils/connectDB';

const handler = async (req, res) => {
    if(req.method == 'POST') {
        const data = req.body;
        const {client, db} = await connectDB();
        const collection = db.collection("messages");
        const result = await collection.insertOne(data);
        client.close();
        console.log(result);
        res.status(201).json({message: 'message inserted'})
    }
}

export default handler;