const request = require("supertest");
const server = require('../api/server.js');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJsdWthc2phcm9uaXMiLCJwYXNzd29yZCI6IiQyYSQxMiRhNEFvMTQ3SGlRYTlsWkw2NWtGTzh1bHJzb291Tm9uZW5SYWNmTkw4WnV1Wlc4RExaa1hscSIsImlhdCI6MTU4MDQ5MDcwNCwiZXhwIjoxNTgwNTc3MTA0fQ.ay8NQS_w5GFlwMWIjLwoqc66m1ABphHenvAesGyIje8';

describe("server", function() {

    describe("GET /api/jokes/", function() {
        it("should return 200", function() {
          return request(server)
            .get("/api/jokes/")
            .set('authorization', token)
            .then(res => {
              expect(res.status).toBe(200);
            })
        })
  
      it("should return JSON formatted response", function() {
        return request(server)
          .get("/api/jokes/")
          .set('authorization', token)
          .then(res => {
            expect(res.type).toMatch(/json/i);
          });
      });
  
      it("should have jokes in the array", function() {
        return request(server)
          .get("/api/jokes/")
          .set('authorization', token)
          .then(res => {
            expect(res.text).not.toHaveLength(0);
          });
  
      })

      it.todo("should return an array of jokes")
    })
  })