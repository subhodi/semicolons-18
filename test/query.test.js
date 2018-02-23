var request = require('supertest');
var app = require('../src/app');

describe("GET /", () => {
    it("should return Action items for a specific user", (done) => {
        request(app).get("/api/meeting/day1/actionitems/sid226")
            .expect(200, done);
    });
});

describe("GET /api/meeting/name/issues/name", () => {
    it("should retrun issues assigned to specific user", (done) => {
        request(app).get("/api/meeting/name/issues/YajneshRai")
            .expect(200, done);
    });
});
