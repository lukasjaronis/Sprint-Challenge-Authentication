/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || "lukas";

    // check if token is valid

    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        // token invalid
        res.status(401).json({
          errorMessage: `Invalid Credentials`
        });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({
      you: "shall not pass!"
    });
  }
};
