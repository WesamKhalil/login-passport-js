const User = require('../models/user.js')

const requireAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}

const checkUser = async (req, res, next) => {
    if(req.isAuthenticated()) {
        res.locals.user = req.user
        next()
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = {
    requireAuth,
    checkUser
}