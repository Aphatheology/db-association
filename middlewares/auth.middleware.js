import { jwt, verify } from 'jsonwebtoken';
import authConfig from '../config/auth.config';

const verifyToken = (req, res, next) => {
    let token = req.headers["Authorization"];

    if(!token) {
        return res.status(403)
                    .send({message: "Forbidden"});
    } 

    verify(token, authConfig.secretKey, (err, decoded) => {
        if(err) {
            return res.status(401)
                        .send({message: "Access denied"});
        }

    })
}

module.exports = { verifyToken }