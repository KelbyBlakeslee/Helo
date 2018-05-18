require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , controller = require('./controller');



const app = express();

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env

const user = [{
    id: ''
}]


massive(process.env.CONNECTION_STRING).then((db) => {
    console.log('db connected')
    app.set('db', db);
})


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    let db = app.get('db');
    let { displayName, picture, id } = profile;
    db.find_user([id]).then((foundUser) => {
        if (foundUser[0]) {
            done(null, foundUser[0].id)
        } else {
            db.create_user([displayName, picture, id]).then((user) => {
                done(null, user[0].id)
            })
        }
    })

    db.create_user([displayName, picture, id]).then((user) => {
        done(null, user[0].id)
    })
}))

passport.serializeUser((id, done) => {
    done(null, id)
})

passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id]).then((user) => {
        done(null, user[0])
    })
})

app.get('/login', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard'
}))

app.get('/auth/me', function (req, res) {
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('ur mom gey')
    }
})




app.get('/api/user', (req, res) => {
    res.send(user)
});


app.get('/api/user/:id', (req, res) => {
    let { users } = req.params
    res.send(userAdded[0])
})

app.put('/api/users/:id', (req, res) => {
    let userIndex = null
    user.forEach((user, index) => {
        if (user.id === Number(req.params.id)) {
            userIndex = index
        }
    })
    res.send(user)
});


app.delete('/api/user/:id', (req, res) => {
    user.forEach((user, index) => {
        if (user.id === Number(req.params.id)) {
            user.splice(index, 1)
        }
    })
    res.status(200).send('Deleted')
});





app.listen(4000, () => {
    console.log(`We are many, You are one on ${4000}`)
})