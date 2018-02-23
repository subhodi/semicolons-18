var request = require('supertest');
var app = require('../src/app');

describe("GET /", () => {
  it("should return all projects", (done) => {
    request(app).get("/api/project")
      .expect(200, done);
  });
});

describe("GET /api/project/name", () => {
  it("should specified project details", (done) => {
    request(app).get("/api/project/meet-assist")
      .expect(200, done);
  });
});
