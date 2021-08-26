const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const userRoutes = require('./api/routes/users');
const postRoutes = require('./api/routes/posts');
const commentRoutes = require('./api/routes/comments');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }).then(() => {
    console.log(process.env.DB_CONNECTION);
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log(process.env.DB_CONNECTION);
    console.log(err);
    console.log('Could not connect to the database. Exiting now.');
    process.exit();
});

// Middleware 
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.header('Access-Contral-Allow-Origin', '*');
   res.header('Access-Contral-Allow-Header','Origin, x-Requested-With, Content-Type, Accept, Authorization');
   next();
   if(req.method==='OPTION'){
      res.header('Access-Control-Allow-Method','PUT, POST, PATCH','DELETE')
      next();
   }
});


//Routes which should handle request
app.get('/test', (req,res,next) =>{
    req.body.name = 'welcome suhel'
    next();
}, (req,res) => {
    res.send(req.body.name);
});


// Middleware
app.use('/post', postRoutes);
app.use('/user', userRoutes);
app.use('/comment', commentRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status= 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports= app;