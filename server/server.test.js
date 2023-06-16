const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const server = require('./server'); // Assuming your server file is named server.js

chai.use(chaiHttp);

describe('Roman Converter', () => {
  describe('GET /romannumeral', () => {
    it('should return the correct Roman numeral for a valid input', (done) => {
      chai.request(server)
        .get('/romannumeral')
        .query({ query: '9' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('input', '9');
          expect(res.body).to.have.property('output', 'IX');
          done();
        });
    });

    it('should return an error for an invalid input', (done) => {
      chai.request(server)
        .get('/romannumeral')
        .query({ query: 'abc' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.equal('Invalid input. Please provide a number between 1 and 3999.');
          done();
        });
    });
  });
});
