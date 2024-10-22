const User = require("../models/User");

exports.getLogin = (req,res)=>{
    res.render('login')
}

exports.getRegister = (req,res)=>{
    res.render('register')
}

exports.login = async(req,res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        const passwordMatch = await User.findOne({passwordMatch})
        if (user && passwordMatch){
            res.send('Login success')
        }else {
           res.send('Login failed') 
        }
    } catch (error) {
        console.log(error);
    }
}

exports.register = async(req,res)=>{
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
}