import mongoose from "mongoose";



export const connectToDb = async ()=>{
    try{
        let con = process.env.DB_CONNECTION||"mongodb+srv://r0548449030:riki9030@rikiyluz.0v5sbwj.mongodb.net/?retryWrites=true&w=majority";
        await mongoose.connect(con);
        console.log("mongoDB connected successfully", con.connection.host);
       
    }catch(err){
        console.log("cannot connect to mongoDB");
        console.log(err);
        process.exit(1);
    }
}
