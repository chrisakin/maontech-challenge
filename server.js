const express = require('express');
const morgan = require('morgan');
const cors = require('cors');                  
const port = process.env.PORT || 8080;
const app = express(); 
require("./config/db");

//express application using required packages 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// api endpoint routes
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const profileRoutes = require('./routes/profileRoutes');

//express application using Routes from this application
app.use('/api/auth', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/profile', profileRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
}); 