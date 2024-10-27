const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Keep as User
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email }); // Instance named 'user'
                if (!user) {
                    return done(null, false, {
                        message: 'User not found with that email',
                    });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password' });
                }

                return done(null, user);
            } catch (error) {
                console.error('Error in authentication:', error);
                return done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id); // Still using 'user'
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

exports.logout = (req,res) =>{
    req.logout((err)=>{
        if (err){
            return next (err)
        }else {
            res.redirect('/auth/login')
        }
    })
}
