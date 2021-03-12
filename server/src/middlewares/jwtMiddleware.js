const {verifyJwt, getTokenFromHeaders} = require('../helpers/JwtHelper');

const checkJwt = (req, res, next) => {
    const token = getTokenFromHeaders(req.headers);

    if(!token) { return res.status(401).json({messageFailded: 'Access denied.'})}

    try {
        const decoded = verifyJwt(token);
        req.id = decoded.id;
        req.username = decoded.username;
        next();
    } catch (Errors) {
        return res.status(401).json({messageFailded: 'Access denied.'});
    }
}

module.exports = {checkJwt};