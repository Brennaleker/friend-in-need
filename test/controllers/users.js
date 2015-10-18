var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

describe("Accessing users",function(){
  it("should return a list of users",function(done){
    server
    .get("/users")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });
});

describe("Able to access a single user",function(){
  it("should return a user's information",function(done){
    server
    .get("/user/1")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });
});
