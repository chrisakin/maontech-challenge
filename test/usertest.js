process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const User = require('../models/userModel');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');


chai.should();
chai.use(chaiHttp);

describe('Users', () => {
// // /*
// //   * Test the /GET route
// //   */
  describe('/GET user', () => {
      it('it should GET one user', (done) => {
        chai.request(server)
            .get('/api/auth/oneuser')
            .end((err, response) => {
                  response.should.have.status(200);
                  response.body.should.have.property('message').equal('Successful');
              done();
            });
      });
  });

// * Test the /signup route
//   */
  describe('/POST signup user', () => {
      it('it should Signup a user', (done) => {
          let user = {
              email: "xxxyyyy@gmail.com",
              name: "Wuraola Benson",
              password: "xxxyyyyzzz",
              displayname: "Wura"
          }
        chai.request(server)
            .post('/api/auth/signup')
            .send(user)
            .end((err, response) => {
                  response.should.have.status(200);
                  response.body.should.be.a('object');
                  response.body.should.have.property('token')
                  response.body.should.have.property('message').equal('SignUp Successful');
              done();
            });
      });

  });


  // * Test the /login route
//   */
describe('/POST user', () => {
    it('it should Login a user', (done) => {
        let user = {
            email: "xxxx@gmail.com",
            password: "xxxxyyyyyzzzz",
        }
      chai.request(server)
          .post('/api/auth/login')
          .send(user)
          .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('token')
                response.body.should.have.property('message').equal('Login Successful');
            done();
          });
    });

});
});