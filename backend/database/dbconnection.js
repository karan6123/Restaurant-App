import mongoose from 'mongoose';

 export const connectDB= () => {
    mongoose.connect(process.env.MONGODB_URL, {
        dbName:"Restaurant"
    }).then(() => {
        console.log("MongoDB connected successfully");
    }).catch(error => {
        console.log(`MongoDB connection failed ${error}`);
});
};