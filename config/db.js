// Connecting to mongoDB
const mongoose = require('mongoose');
require("../models/userModel");
require("../models/questionsModel");

var uri = "mongodb+srv://moantech:H8V5d8l5aM0uX0Rj@cluster0.ao2pe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


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
