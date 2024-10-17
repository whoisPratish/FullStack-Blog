const express = require('express');
const mongoose = require('mongoose');
const app = express();


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