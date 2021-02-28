const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./User');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://kumhoktg:kumhoktg@cktgdb0.uzmnp.mongodb.net/cktgdb0?retryWrites=true&w=majority');

const app = express();

app.use(cors());

app.get('/', (req, res, next) => {
    res.send('send winaki3 from server4')    
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.post('/signin', (req, res, next) => {

    const newUser = new User({
        userid: req.body.userid,
        name: req.body.name,
        dept: req.body.dept,
        email: req.body.email,
        password: bcrpyt.hashSync(req.body.password, 10)
    })
    console.log(req.body)
    console.log(newUser)

    newUser.save(err => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                title: 'error',
                error: 'email in user'
            })
        }
        return res.status(200).json({
            title: 'signin success'
        })
    })
})


app.post('/login', (req, res, next) => {

    User.findOne({ userid: req.body.userid }, (err, user) => {
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
        })
        if (!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            })
        }
        //incorrect password
        if (!bcrpyt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            })
        }
        //if all is good create a token and send to frontend
        let token = jwt.sign({ userId: user._id }, 'secretkey');        
        return res.status(200).json({
            title: 'login success',
            userid: user.userid,
            name: user.name,
            token: token
        })
    })    
    console.log(req.body)
})

app.get('/user', (req, res, next) => {
    let token = req.headers.token;
    console.log(req.headers);

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        })
        console.log(decoded);
        //token  is valid
        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err)
            return res.status(200).json({
                title: 'user grabbed',
                user: {
                    userid: user.userid,
                    name: user.name,
                    email: user.email,
                    dept: user.dept
                }
            })
        })
     })
})

const port = process.env.PORT || 6001;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('server running on port ' + port);
})

