const LocalStrategy = require('passport-local')
const passport = require('passport')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

const authenticateUser = async (email, password, done) => {
    try {
        const user = await User.findOne({email})
        const auth = await bcrypt.compare(password, user.password)
        if(user == null || !auth) {
            done(null, false)
        } else {
            console.log('working')
            done(null, user)
        }
    } catch(err) {
        done(err)
    }
}

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
    const currentUser = await User.findById(id)
    done(null, currentUser)
})
passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))