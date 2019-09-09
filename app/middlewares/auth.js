var jwt = require('jsonwebtoken');

async function verifyJWT(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    try {
        const decoded = await jwt.verify(token, process.env.SECRET)
        req.userId = decoded.id;
        return next();
    } catch (err) {
        return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    }

}

module.exports = { verifyJWT: verifyJWT }

/*
function verifyJWT(req, res, next) {
    var token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if(err){
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
}
*/