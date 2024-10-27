const User = require("../models/User");
const bcrypt = require('bcryptjs');
const passport = require('passport');


exports.getLogin = (req,res)=>{
    res.render('login', {
        title : 'Login',
        error : '',
        user : req.user
    })
    
}

exports.getRegister = (req,res)=>{
    res.render('register', {
        title: 'Register',
        user : req.user,
        error : ''
    });
   
}

exports.login = async(req, res,next) => {
    passport.authenticate('local', (err,user,info)=>{
        if (err){
            return next(err)
        }
        if (!user){
            return res.render('login', {
                title : 'Login',
                user : req.user,
                error : info.message
            })
        }
        req.logIn (user, (err)=>{
            if (err){
                return next(err)
            }
            return res.redirect('/')
        })
    }
    )(req,res,next)
}


exports.register = async(req,res)=>{
    const {username, password, email} = req.body;
    try {
      const exisingUser = await User.findOne({email});
      if(exisingUser){
        res.render ('register', {
            title : 'Register',
            user : req.user,
            error :'User already exists'
        })
      }else {
        const hashedPw = await bcrypt.hash(password, 10);
        const newUser = await  User.create({
            username, email, password : hashedPw
        })
       
        res.redirect('/auth/login')
      }
    } catch (error) {
      res.render('register', {
        title : 'Register',
        user : req.user,
        error: error.message
      })
    }
}