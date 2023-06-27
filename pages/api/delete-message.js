//  /api/delete-message

import db from '../../utils/connectDB';

const handler = async (req, res) => {
    if(req.method == 'POST') {
        try {
            // Construct the SQL query to delete the message with the given id
            const query = `DELETE FROM messages WHERE id = ${req.body};`

            // Execute the query
            db.query(query, (error, result) => {
                if(error) {
                    throw error
                } else {
                    res.send({status: 'success', result});
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default handler;