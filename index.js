require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();


const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.urlencoded({ extended:true }))

app.set('view engine', 'ejs')
  
const connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log('Connected to database...');
        
    } catch (error) {
        console.log(error);
        
    }
} 
connectToDb()

// render login page
app.get('/auth/login', (req,res)=>{
    res.render('login')
})


// render register page
app.get('/auth/register', (req,res)=>{
    res.render('register')
})

// main logic for login
app.post ('/auth/login', async(req,res)=>{
    console.log(req.body);
    res.send('LOGGED IN!!')
 })

 // main logic for user login
 app.post('/auth/login', async(req,res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        const passwordMatch = await User.findOne({passwordMatch})
        if (user && passwordMatch){

        }else {
            
        }
    } catch (error) {
        
    }
 })

// main logic for user registration
app.post ('/auth/register', async(req,res)=>{
  const {username, password, email} = req.body;
  try {
    const user = await User.findOne({email});
    if(user){
        res.send('There is already an account associated with that e-mail.')
    }else {
        const newUser = new User({
            username,
            password,
            email
        })
        await newUser.save()
        res.redirect('/auth/login')
    }
  } catch (error) {
    console.log(error);
  }
})

app.listen(PORT, ()=>{
    console.log(`Server is running in http://localhost:${PORT}`);
})