const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');

// accessing from routes
const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const posts=require('./routes/api/posts');
const passport =require('passport');


const app=express();
// body-parser middleware to access request.body
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//db configuration
const db=require('./config/keys').mongoURI;
// connect to mongodb
mongoose
.connect(db,{useNewUrlParser: true})
.then(()=>console.log('MongoDb connected'))
.catch(err=>console.log(err));
//passport middleware
app.use(passport.initialize());
// passport configuration
require('./config/passport')(passport);

app.get('/',(req,res)=>{
  res.send('Hello world');
});
//use routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);
// to deploy to heroku and on port number 5000
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server running on port ${port}`));
