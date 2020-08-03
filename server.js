const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const knex = require('knex');

const bcrypt = require('bcrypt-nodejs');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'mangal',
        password: 'mangal',
        database: 'smart-brain'
    }
});

const cors = require('cors');

// Controllers that handle routes
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Middlewares
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('It is working!');
})

// Routes
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});


