const router = require('express').Router();
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('./auth-model');
const { validateUser } = require('./auth-helpers');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  // validate the data before sending it to the database!
  const validateResult = validateUser(user);

  if (validateResult.isSuccessfull === true) {
    const hash = bc.hashSync(user.password, 12);
    user.password = hash;

    userModel.add(user) 
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error)
    })

  } else {
    res.status(400).json({
      errorMsg: `Invalid username or password.`,
      errors: validateResult.errors
    })
  }
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body;

  userModel.findBy({username})
  .first()
  .then(user => {
    if (user && bc.compareSync(password, user.password)) {
      // produce a token
      const token = getJwtToken(user);
      // send the token to client
      res.status(200).json({
        welcomeMessage: `Welcome ${user.username}. Here is a token - `,
        token
      });
    } else {
      res.status(401).json({
        errorMsg: `Invalid Credentials`
      })
    }
  })
  .catch(error => {
    res.status(500).json(error)  
  })
});

function getJwtToken(user) {
  const payload = user;
  const secret = process.env.JWT_SECRET || 'lukas';

  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
