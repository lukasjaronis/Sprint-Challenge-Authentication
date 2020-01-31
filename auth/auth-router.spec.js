const request = require("supertest");
const server = require("../api/server.js");
const userModel = require("../database/dbConfig.js")

it("should set db environment to testing", function () {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("server", function() {
  describe("POST /api/auth/register valid user", function() {
    beforeEach(async () => {
      await userModel('users').truncate();
    });

    it("should return status code 201", function() {
      // register a user
      const newUser = { username: "kaikaikai", password: "dogdogdog" }
      return request(server)
        .post("/api/auth/register")
        .send(newUser)
        .then(res => {
          expect(res.status).toBe(201);
        })
    })
  })

  describe("POST /api/auth/register invalid user", function() {
    beforeEach(async () => {
      await userModel('users').truncate();
    });

    it("should return status code 201", function() {
      // register a user
      const badUser = { username: "kaikaikai", badpass: "dogdogdog" }
      return request(server)
        .post("/api/auth/register")
        .send(badUser)
        .then(res => {
          expect(res.status).toBe(400);
        })
    })
  })
})