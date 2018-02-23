var request = require('supertest');
var app = require('../src/app');

describe("GET /", () => {
  it("should return all meetings", (done) => {
    request(app).get("/api/meeting")
      .expect(200, done);
  });
});

describe("POST /meeting/populate", () => {
  it("should populate DB with meeting details", (done) => {
    request(app).post("/api/meeting/populate")
      .send({
        "name": "day1"
      })
      .expect(200, done);
  });
});


describe("GET /meeting/name", () => {
  it("should return specified meeting details", (done) => {
    request(app).get("/api/meeting/day1")
      .expect(200, done);
  });
});


