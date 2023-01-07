//  /api/edit-message

//UTILS
import { ObjectId } from 'mongodb';
import connectDB from '../../utils/connectDB';

const handler = async (req, res) => {
    if(req.method == 'POST') {
        const data = req.body;
        const {client, db} = await connectDB();
        const collection = db.collection("messages");
        const result = await collection.updateOne({_id: ObjectId(data.id)}, {$set: data});
        client.close();
        console.log(result);
        res.status(201).json({message: 'message updated'})
    }
}

export default handler;