import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://aasuvaksha:ska579@cluster0.x1ica.mongodb.net/FoodieFrenzy')
    .then(()=> console.log('DB connected successfully'))
}