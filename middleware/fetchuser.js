
const jwt = require('jsonwebtoken');


const jwtsign = 'YOAATIETAEFHASFHAskdghlkhgs'; 


const fetchuser = (req,res,next)=>{
    //get the user from the JWT token and add id to req object 
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error : "Please authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token, jwtsign);
        req.user = data.user; 
        //next here is basically the funcn which is going to be executed after using the middlware for eg in fetch user details next would be the body of our res funcn
        next();
    } catch (error) {
        res.status(401).send({error : "Please authenticate using valid token"})
    }
}

module.exports = fetchuser;