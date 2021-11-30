// Connecting to mongoDB
const mongoose = require('mongoose');
require("../models/userModel");
require("../models/questionsModel");

var uri = "mongodb+srv://Azela:Mo6DwJ28xwNIzIxx@azela.nxxex.mongodb.net/test?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(uri, options).then(() =>{
    console.log('Database connection established!');
})
.catch((error) => {
        console.log('Error connecting to Database');
        console.error(error);
});
