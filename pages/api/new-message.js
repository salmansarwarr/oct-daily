//  /api/new-message

//UTILS
import db from '../../utils/connectDB';

const handler = async (req, res) => {
    const {no, text} = req.body;
    if(req.method == 'POST') {
        try {
            const query = `INSERT INTO messages VALUES (${no}, '${text}', ${no})`
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