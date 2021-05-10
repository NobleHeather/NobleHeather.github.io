// quoi faire avec le token ?
// pas mettre d'infos sensibles
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'une clé compliquée';

module.exports = {
    generateTokenForUser: function(userData) {
        return JWT_SIGN_SECRET.sign({
            userId : userData.id,
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}

