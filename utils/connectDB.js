//MONGODB
import { MongoClient } from "mongodb";

const connectDB = async () => {
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0iczgaa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    const db = client.db();

    return {
        client,
        db
    };
};

export default connectDB;