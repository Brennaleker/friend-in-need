var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

describe("Accessing gifts",function(){
  it("should return a list of gifts",function(done){
    server
    .get("/gifts")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });
});

describe("Able to access a single gift",function(){
  it("should return a gift's information",function(done){
    server
    .get("/gift/1")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });
});
