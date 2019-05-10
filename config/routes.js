const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbApi = require('../api/database');

const jwtKey =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable';

const {
  authenticate
} = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', validation, register);
  server.post('/api/login', validation, login);
  server.get('/api/jokes', authenticate, getJokes);
};

function validation(req, res, next) {
  if (req.body.username === undefined || req.body.username.trim() === '') {
    res.status(422).send({
      message: 'Enter A Username'
    });
  } else if (req.body.password === undefined || req.body.password.trim() === '') {
    res.status(422).send({
      message: 'Enter A Password'
    });
  } else {
    next();
  }
}

function register(req, res) {

  const {
    username,
    password
  } = req.body;
  const hashedPass = bcrypt.hashSync(password, 10);

  dbApi.add({
      username,
      password: hashedPass
    })
    .then(usr => {
      res.status(200).send({
        token: jwt.sign(usr, jwtKey, {
          expiresIn: '1h'
        })
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Internal Server Error'
      });
    });
}

function login(req, res) {
  const {
    username,
    password
  } = req.body;

  dbApi.get(username)
    .then(usr => {
      if (usr && bcrypt.compareSync(password, usr.password, 10)) {
        res.status(200).send({
          token: jwt.sign(usr, jwtKey, {
            expiresIn: '1h'
          })
        });
      } else {
        res.status(401).send({
          message: 'Invalid Credentials'
        });
      }

    })
    .catch(err => {
      res.status(500).send({
        message: 'Internal Server Error'
      });
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: {
      accept: 'application/json'
    },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error Fetching Jokes',
        error: err
      });
    });
}