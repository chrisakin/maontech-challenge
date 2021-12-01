process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const User = require('../models/userModel');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();


chai.use(chaiHttp);

describe('Users', () => {
// /*
//   * Test the /GET route
//   */
  describe('/GET user', () => {
      it('it should GET one user', (done) => {
        chai.request(server)
            .get('/api/auth/oneuser')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.json.should.have.property('message').equal('Successful');
              done();
            });
      });
  });

// * Test the /signup route
//   */
  describe('/POST signup user', () => {
      it('it should Signup a user', (done) => {
          let user = {
              email: "chrisfemide@gmail.com",
              name: "Akintade Christopher",
              password: "demilade",
              displayname: "Chris"
          }
        chai.request(server)
            .post('/api/auth/signup')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.json.should.be.a('object');
                  res.should.have.property('token')
                  res.json.should.have.property('message').equal('SignUp Successful');
              done();
            });
      });

  });


  // * Test the /login route
//   */
describe('/POST user', () => {
    it('it should Login a user', (done) => {
        let user = {
            email: "chrisfemide@gmail.com",
            password: "demilade",
        }
      chai.request(server)
          .post('/api/auth/login')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.should.have.property('token')
                res.body.should.be.a('object');
                res.body.should.have.property('message').equal('Login Successful');
            done();
          });
    });

});
});