//  /api/edit-message

//UTILS
import db from "../../utils/connectDB";

const handler = async (req, res) => {
    const { id, text } = req.body;
    if (req.method == "POST") {
        try {
            // Construct the SQL query to update the message with the given id
            const query = `UPDATE messages SET text = '${text}' WHERE id = ${id};`;

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
