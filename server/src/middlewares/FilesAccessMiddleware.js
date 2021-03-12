const {files, users} = require('../models');
const {verifyJwt, getTokenFromHeaders} = require('../helpers/JwtHelper');

const checkFilesAccess = async (req, res, next) => {
    const token = getTokenFromHeaders(req.headers);
    const splitUrl = req.url.split('/');
    const accessedUrl = req.headers.host + '/files' + req.url;

    const searchFile = await files.findOne({where: {url: accessedUrl}})

    if(!searchFile){return res.status(401).json({messageFailded: 'Access denied.'});}

    if(searchFile.public){ next(); return res.status(200)};


    if(token){
        try {
            const decoded = verifyJwt(token);
    
            const searchUser = await users.findByPk(decoded.id);
    
            if(splitUrl[1] === decoded.username && splitUrl[1] === searchUser.username && searchUser.id === searchFile.usersId && decoded.username === searchUser.username){
                next();
                return res.status(200);
            }else{
                return res.status(401).json({messageFailded: 'Access denied.'});
            }
        } catch (error) {
            return res.status(401).json({messageFailded: 'Access denied.'});
        }
    }else{
        return res.status(401).json({messageFailded: 'Access denied.'});
    }
}

module.exports = {checkFilesAccess};