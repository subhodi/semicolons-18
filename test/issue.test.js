var request = require('supertest');
var app = require('../src/app');

describe("GET /", () => {
    it("should return all issues", (done) => {
        request(app).get("/api/issue")
            .expect(200, done);
    });
});

describe("PUT /issue", () => {
    it("should update issue", (done) => {
        request(app).put("/api/issue")
            .send({
                "issueNumber": 2,
                "body": "Adding body from code",
                "labels": ["bug", "feature"],
                "title": "title change from code"
                // "milestone": 1,
                // "assignees": ["usernames"]
            })
            .expect(200, done);
    });
});

describe("GET /issue/name", () => {
    it("should specified issue details", (done) => {
        request(app).get("/api/issue/1")
            .expect(200, done);
    });
});

