const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const app = require('../../src/app.js');

chai.use(chaiHttp);

describe('app', () => {
  it('Should get back all repositories along with the build status', (done) => {
    chai.request(app)
    .get('/')
    .then(function (res) {
      expect(res).to.have.status(200)
      expect(res).to.be.an('object')
      expect(res.res.text).to.includes('Repository:\n                </div>\n                <div class="project-information">\n                  https://github.com/mKleinCreative/idm\n')
      expect(res.res.text).to.includes('Repository:\n                </div>\n                <div class="project-information">\n                  https://github.com/mKleinCreative/echo\n')
      expect(res.res.text).to.includes('Repository:\n                </div>\n                <div class="project-information">\n                  https://github.com/helenyau0/contacts-snapshot-starter\n')
      expect(res.res.text).to.includes('Status:\n                </div>\n                <div class="project-information">\n')
      done()
    })
  });
});
