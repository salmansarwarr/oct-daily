//MONGODB
import { MongoClient } from "mongodb";

const connectDB = async () => {
    const client = await MongoClient.connect(
        `mongodb+srv://msalmansarwar:1ka2ka3ka4@cluster0.0iczgaa.mongodb.net/messages?retryWrites=true&w=majority`
    );
    const db = client.db();

    return {
        client,
        db
    };
};

export default connectDB;