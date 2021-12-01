process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Profile = require('../models/profileModel');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();


chai.use(chaiHttp);