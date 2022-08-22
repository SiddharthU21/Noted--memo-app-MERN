
const express = require('express');
const User = require('../models/User');
const router = express.Router();
//express validator
const {  body , validationResult  } = require('express-validator');  
//encrpytion of passwors by salt and pepper
const bcrypt = require('bcryptjs');
//JWT web token for auth 
const jwt = require('jsonwebtoken');
//middleware to decode JWT tokem to user
const fetchuser = require('../middleware/fetchuser');


jwtsign = 'YOAATIETAEFHASFHAskdghlkhgs';

// 1 : Create a User using: Post "/api/auth/createuser" Doesn't require login.
router.post('/createuser',[
    body('email',"Enter a valid email").isEmail(),
    body('name',"Enter a valid name").isLength({ min : 3}),
    body('password','Password entered must be atleast 5 characters').isLength({ min : 5}),
    //this is array of all the valid checks we perform using express-validator package 
] , async(req,res)=>{
  //if errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //to check whether user with this email exists aldready
    try{ 
      let success = true;
          // here we have used findOne to find first instance of the data with this email
          let user = await User.findOne({email: req.body.email});
          if (user) {
            success = false;
            return res.status(400).json({ success , error : 'User with this email aldready exists' });
          }
          //encryption using bcrypt
          const salt = await bcrypt.genSalt(10);
          secPass = await bcrypt.hash(req.body.password, salt);
          //creating user
          user = await User.create({
              name: req.body.name,
              password: secPass,
              email: req.body.email,
            })
          //sending token using our user id as distinct feature of user
          const data = {
            user : {
              id : user.id
            }
          }
          const authtoken = jwt.sign(data , jwtsign);
          
          //sending our authtoken as response
          res.json({success , authtoken}) 

    }catch(error){
          console.error(error.message)
          res.status(500).send('Internal server error');
    }    
})

// 2 : Authenticating a User using: Post "/api/auth/login" Doesn't require login.
router.post('/login',[

  body('email',"Enter a valid email").isEmail(),
  body('password',"Password cannot be blank").exists(),
 
] , async(req,res)=>{
      let success = true;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {email,password} = req.body;
  
      try {        
        let user = await User.findOne({email});
        
        if(!user){
          success = false;
          return res.status(400).json({  success , error: "Please enter valid credentials"  });
        }
        
        const passswordcomp = await bcrypt.compare(password , user.password);
        
        if(!passswordcomp){
          success = false;
          return res.status(400).json({ success , error: "Please enter valid credentials"  });
        }
        
        const data = {
          user : {
            id : user.id
          }
        }
        const authtoken = jwt.sign(data , jwtsign);
       
        res.json({success , authtoken}) 

      }catch(error){
        console.error(error.message)
        res.status(500).send('Internal server error');
  }    

})

// 3 : Getting user details of logged in User using: Post "/api/auth/getuser" Requires login.
router.post('/getuser',fetchuser, async(req,res)=>{
  try {
    let userID = req.user.id;
    const user = await User.findById(userID).select("-password")
    success = true;
    res.send({success , user})
  } catch(error){
    console.error(error.message)
    res.status(500).send('Internal server error');
  }  

})







module.exports = router