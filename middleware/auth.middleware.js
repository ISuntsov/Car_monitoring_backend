const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    
    try {
        // Bearer eweirwoeruweuroweurow - забираем токен после пробела
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Unauthorized 1'})
        }
        
        const data = tokenService.validateAccess(token)
        if (!data) {
            return res.status(401).json({message: 'Unauthorized 2'})
        }
        
        //данные currentUser в формате { _id: '62dc6fb0335737236b2e1cb5', iat: 1658654388, exp: 1658657988 }
        req.user = data
        
        // вызов метода, чтобы остальные middleware продолжали работать
        next()
        
    } catch (e) {
        res.status(401).json({message: 'Unauthorized 3'})
    }
}