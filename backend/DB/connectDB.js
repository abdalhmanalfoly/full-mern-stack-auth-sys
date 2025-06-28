import mongoose from "mongoose"

export const ConnectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongodb connected ${connection} securely`);
    }catch(err){
        console.log("mongodb connected error is :  ===>  ",err.message);
        process.exit(1)
    }
    console.log("DB Connected Successfully");
}
