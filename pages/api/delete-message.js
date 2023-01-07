//  /api/edit-message

//UTILS
import { ObjectId } from 'mongodb';
import connectDB from '../../utils/connectDB';

const handler = async (req, res) => {
    if(req.method == 'POST') {
        const id = req.body;
        const {client, db} = await connectDB();
        const collection = db.collection("messages");
        const result = await collection.deleteOne({_id: ObjectId(id)});
        client.close();
        console.log(result);
        res.status(201).json({message: 'message deleted'})
    }
}

export default handler;