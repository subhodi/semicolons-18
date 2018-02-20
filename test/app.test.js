var request = require('supertest');
var app = require('../src/app');

describe("GET /", () => {
  it("should return 200", (done) => {
    request(app).get("/api/user")
      .expect(200, done);
  });
});

describe("POST /user", () => {
  it("should return 200", (done) => {
    request(app).post("/api/user")
      .field("name", "john")
      .field("email", "john@lobo.com")
      .field("date", "2013")
      .expect(200, done);
  });
});

describe("GET /user/name", () => {
  it("should return 200", (done) => {
    request(app).get("/api/user/john")
      .expect(200, done);
  });
});


