const express = require('express')
const app = express()
const authRoutes = require('./routes/authRoutes.js')
const mongoose = require('mongoose')
const {requireAuth, checkUser} = require('./middleware/authMiddleware.js')
const session = require('express-session')
const passport = require('passport')
const passportConfig = require('./config/passport-config.js')
const flash = require('express-flash')

const dbURI = 'mongodb+srv://FCC:' + process.env.PW + '@cluster0.1mvbk.mongodb.net/passport-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }, () => {
    console.log('Connected to mongoDB.')
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use('/public', express.static('public'))
app.use(flash())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('*', checkUser)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/success', requireAuth, (req, res) => {
    res.render('success')
})

app.use(authRoutes)


app.listen(process.env.PORT || 3000, (req, res) => {
    console.log('Listening on port ' + (process.env.PORT || 3000))
})