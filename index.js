require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();


const PORT = process.env.PORT || 3000;

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

app.get('/auth/login', (req,res)=>{
    res.render('login')
})

app.get('/auth/register', (req,res)=>{
    res.render('register')
})

app.listen(PORT, ()=>{
    console.log(`Server is running in http://localhost:${PORT}`);
})