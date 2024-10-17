require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// mongodb+srv://madridistapratish7:<db_password>@fullstack-blog.kgce4.mongodb.net/?retryWrites=true&w=majority&appName=fullstack-blog
// pratish
const PORT = process.env.PORT || 3000;


const connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log('Connected to database...');
        
    } catch (error) {
        console.log(error);
        
    }
}
connectToDb()
app.listen(PORT, ()=>{
    console.log(`Server is running in http://localhost:${PORT}`);
})