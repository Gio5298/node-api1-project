// implement your API here
const express = require('express');

const User = require('./data/db');

const server = express();

server.get('/', function (request, response) {
  response.send({ hello: 'Project then' });
});

server.post('/api/users', (req, res) => {
  const userData = req.body;
  User.add(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: 'sorry, we ran into an error creating the user!',
      });
    });
});

server.get('/api/users', (req, res) => {
  User.find()
  .then(user => {
    console.log('User', user);
    res.status
  })
})

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));