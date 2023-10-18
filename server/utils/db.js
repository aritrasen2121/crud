import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL).then(() => console.log(`connected to db`))
    } catch (err) {
        console.log(err);
        setTimeout(connectDB,5000)
    }
}

export default connectDB