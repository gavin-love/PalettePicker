const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = require('../knexfile')['test'];
const database = require('knex')(environment);

chai.use(chaiHttp);

describe('/api/v1/projects', () => {
  beforeEach(done => {
    database.migrate.rollback()
      .then(() => database.migrate.latest())
      .then(() => database.seed.run())
      .then(() => done());
  });

  it.only('should return a list of palettes when a GET request is made', (done) => {
    chai.request(server)
      .get('/api/v1/palettes')
      .end((error, response) => {
        should.equal(error, null);
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.should.have.length(2);
        response.body[0].should.be.a('object');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('title');
        response.body[0].should.have.property('color_one');
        response.body[0].should.have.property('color_two');
        response.body[0].should.have.property('color_three');
        response.body[0].should.have.property('color_four');
        response.body[0].should.have.property('color_five');
        response.body[0].id.should.be.a('number');
        response.body[0].title.should.be.a('string');
        response.body[0].color_one.should.be.a('string');
        response.body[0].color_two.should.be.a('string');
        response.body[0].color_three.should.be.a('string');
        response.body[0].color_four.should.be.a('string');
        response.body[0].color_five.should.be.a('string');
        response.body[0].id.should.equal(1);
        response.body[0].title.should.equal('sands');
        response.body[0].color_one.should.equal('#c2b280');
        response.body[0].color_two.should.equal('#c2b280');
        response.body[0].color_three.should.equal('#c2b280');
        response.body[0].color_four.should.equal('#c2b280');
        response.body[0].color_five.should.equal('#c2b280');
        done();
      })
  })
});