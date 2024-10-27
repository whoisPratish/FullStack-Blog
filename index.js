require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const userRoutes = require('./routes/authRoutes');
const passportConfig = require('./config/passport');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const app = express();


const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret : 'this-is-a-secret-key',
    resave : false,
    saveUninitialized : false,
    store : MongoStore.create({mongoUrl :process.env.MONGOOSE_URL })
}))

passportConfig(passport)
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs')

const connectToDb = async (req, res) => {

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


app.listen(PORT, () => {

    console.log(`Server is running in http://localhost:${PORT}`);
})