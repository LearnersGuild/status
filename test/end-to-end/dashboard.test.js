const chai = require('chai');
const expect = require('chai').expect; 
const chaiHttp = require('chai-http');
const app = require('../../src/app.js');

chai.use(chaiHttp);

describe('app', () => {
  it('sddasd', (done) => {
    chai.request(app)
    .get('/')
    .then(function (res) {
      console.log('res', res);
      expect(res).to.be.an('array')
      done()
    })
  });
});
