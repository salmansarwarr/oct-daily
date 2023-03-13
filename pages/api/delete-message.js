//  /api/delete-message

//UTILS
import db from '../../utils/connectDB';

const handler = async (req, res) => {
    if(req.method == 'POST') {
        try {
            console.log(req.body);
            const query = `DELETE FROM messages WHERE id = ${req.body};`
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