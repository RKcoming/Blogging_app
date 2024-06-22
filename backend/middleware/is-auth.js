const jwt=require('jsonwebtoken');

module.exports=async (req,res,next)=>{
    const authHeader=req.headers['authorization'];
    if(!authHeader){
        console.log("Please login firstyyy");
        return  res.status(401).json({message:'Please login firstyyy'});
    }
    let decodedToken;
    try{
        decodedToken=jwt.verify(authHeader,'thisIsRkSecret');
    }catch(err){
        console.log("teri  ",err);
        return res.status(401).json({message:'Please login firsttttt'});
    }
    if(!decodedToken){
        console.log('Please login first')
        return  res.status(401).json({message:'Please login first'}); 
    }
    
    req.userId=decodedToken.id;
    next();
}