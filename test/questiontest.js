process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Question = require('../models/questionsModel');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.should();


chai.use(chaiHttp);

// should.set('token', token)