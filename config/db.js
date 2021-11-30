// Connecting to mongoDB
const mongoose = require('mongoose');
var uri = "mongodb+srv://Azela:Mo6DwJ28xwNIzIxx@azela.nxxex.mongodb.net/test?retryWrites=true&w=majority";

const options = {
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

mongoose.connect(uri, options).then(() =>{
    console.log('Database connection established!');
})
.catch((error) => {
        console.log('Error connecting to Database');
        console.error(error);
});
