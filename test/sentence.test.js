var request = require('supertest');
var app = require('../src/app');

describe("GET /", () => {
  it("should return all sentences", (done) => {
    request(app).get("/api/sentence")
      .expect(200, done);
  });
});


describe("GET api/sentence/name", () => {
  it("should specified sentence details", (done) => {
    request(app).get("/api/sentence/day1")
      .expect(200, done);
  });
});


