process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Question = require('../models/questionsModel');
const checkJWT = require('../middleware/check-jwt');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.should();


chai.use(chaiHttp);
describe('Questions', () => {
// should.set('token', token)
// * Test the /signup route
//   */
describe('/POST post a question', () => {
    it('it should add a users question', (done) => {
        let questionDetails = {
            textone: "xxxyyyy are you good",
            texttwo: "Wuraola Benson",
            name: "xxxyyyyzzz",
            tag: "Wura"
        }
      chai.request(server)
          .post('/api/questions')
          .send(questionDetails)
          .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message').equal('Successful');
            done();
          });
        });
    });

    describe('/GET questions', () => {
        it('it should GET all the questions', (done) => {
          chai.request(server)
              .get('/api/questions')
              .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('message').equal('Successful');
                done();
              });
        });
    });
});