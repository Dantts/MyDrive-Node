const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

module.exports = {
   storage: multer.diskStorage({
        destination: async function(req, file, cb) {
            cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads', req.username));
        },
        filename: function(req, file, cb) {
            crypto.randomBytes(16, (err, hash) => {
                if(err) return;
                cb(null, hash.toString('hex') + '-' + (file.originalname.replace(/\s/g, '')));
            })
        }
    })
};