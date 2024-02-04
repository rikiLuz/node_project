import jwt from "jsonwebtoken";

export const authUser = async (req,res,next)=>{
    let token = req.headers["a-accsse-token"];
    if(!token)
        return res.status(401).json({type:"not authorized", massege:"user not authorized"});
    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next();
    }catch(err){
        return res.status(401).json({type:"not authorized", massege:"user not authorized"});

    }
}
export const authAdmin = async (req,res,next)=>{
    let token = req.headers["a-accsse-token"];
    if(!token)
        return res.status(401).json({type:"not authorized", massege:"user not authorized"});
    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        if(decoded.role=="ADMIN")
             next();
        return res.status(401).json({type:"not authorized", massege:" only admin authorized"});
    
    }catch(err){
        return res.status(401).json({type:"not authorized", massege:"user not authorized"});

    }
}



