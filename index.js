require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const userRoutes = require('./routes/authRoutes');
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


// routes
app.use('/auth', userRoutes)



app.listen(PORT, ()=>{
    console.log(`Server is running in http://localhost:${PORT}`);
})