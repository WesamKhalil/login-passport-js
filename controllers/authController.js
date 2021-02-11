const User = require('../models/user.js')
const passport = require('passport')

const login_get = (req, res) => {
    res.render('login')
}

const register_get = (req, res) => {
    res.render('register')
}

const login_post = passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login',
    failureFlash: true
})

const register_post = async (req, res) => {
    try {
        await User.create(req.body)
        res.redirect('/login')
    } catch(err) {
        res.status(400).res(err)
    }
}


const logout_delete = (req, res) => {
    req.logOut()
    res.redirect('/login')
}

module.exports = {
    login_get,
    login_post,
    register_get,
    register_post,
    logout_delete
}