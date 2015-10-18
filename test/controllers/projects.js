var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

describe("Accessing projects",function(){
  it("should return a list of projects",function(done){
    server
    .get("/projects")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });
});

describe("Able to access a single project",function(){
  it("should return a project's information",function(done){
    server
    .get("/project/1")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });
});
