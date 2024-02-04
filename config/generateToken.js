import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    let jwtSecretKey = process.env.JWT_SECRET;
    let data = {
        _id: user._id,
        userName: user.userName,
        role: user.role
    }
    const token = jwt.sign(data,jwtSecretKey,{
        expiresIn:'3s'
    })
    return token;
}

