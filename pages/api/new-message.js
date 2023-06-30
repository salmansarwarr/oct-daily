//  /api/new-message

import db from './utils/_connectDB';

const handler = async (req, res) => {
    const { no, text } = req.body;
    if (req.method == "POST") {
        try {
            // Construct the SQL query to insert a new message
            const query = `INSERT INTO messages VALUES (${no}, '${text}', ${no})`;

            // Execute the query
            db.query(query, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    res.send({ status: "success", result });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export default handler;
