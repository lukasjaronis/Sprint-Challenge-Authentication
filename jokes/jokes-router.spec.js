const request = require('superset');
const server = require('../api/server.js');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsdWthc2oiLCJwYXNzd29yZCI6IiQyYSQxMiRYc1pBdFRmdlNSVDlDM2s4NlouQVBlV0NMcHgwckpnYXM0ajFTa21EWUE2YjV5WjE0NkkvUyIsImlhdCI6MTU4MDQ4OTkzNSwiZXhwIjoxNTgwNTc2MzM1fQ.deGLCw1aYE-DUNF1frVyzngHH3EAnSApEa3csX-x2rE';

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