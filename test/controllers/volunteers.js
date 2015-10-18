var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

describe("Accessing volunteers",function(){
  it("should return a list of volunteers",function(done){
    server
    .get("/volunteers")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });
});

describe("Able to access a single volunteer",function(){
  it("should return a volunteer's information",function(done){
    server
    .get("/volunteer/1")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });
});
