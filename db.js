//require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USR}:${process.env.PASSWORD}@cluster0.hogof.mongodb.net/${process.env.DB_NAME}?authSource=admin&retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("db connected");

    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    connectDB
};
