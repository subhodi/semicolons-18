var request = require('supertest');
var app = require('../src/app');

describe("GET /", () => {
  it("should return 200", (done) => {
    request(app).get("/api/user")
      .expect(404, done);
  });
});



