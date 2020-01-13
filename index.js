// implement your API here
const express = require('express');

const User = require('./data/db');

const server = express();

server.use(express.json())

server.get('/', function (request, response) {
  response.send({ hello: 'Project then' });
});

server.post('/api/users', (req, res) => {
  const userData = req.body;
  if (!userData.name || !userData.bio) {
    res.status(400).json({
      errorMessage: `Please provide name and bio for user.`
    })
  } else {
    User.insert(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: 'sorry, we ran into an error creating the user!',
      })
    })
  }
});

// To see the list of users
server.get('/api/users', (req, res) => {
  User.find()
  .then(user => {
    console.log('User', user);
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: 'Sorry, we ran into an error getting the list of users.',
    });
  });
});

// To see specific user
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id)
  .then(user => {
    if (!user){
      res.status(404).json({
        errorMessage: 'The user with the specified id does not exist.'
      })
    } else {
      res.status(200).json(user)
    }
  })
  .catch(errors => {
    console.log(error);
    res.status(500).json({
      errorMessage: 'The user information could not be retrieved.'
    })
  })
})

// To delete a user
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  User.remove(id)
  .then(deleted => {
    if (deleted){
    res.status(200).json({message: 'User succesfully removed', deleted});
    } else {
      res.status(404).json({
        errorMessage: 'The user with that specified id does not exist'
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: 'sorry'
    })
  })
})

// To update a user
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  User.findById(id)
  .then(user => {
    if (!user){
      res.status(404).json({
        errorMessage: 'The user with the specified id does not exist.'
      })
    } else if (!body.name || !body.bio){
      res.status(400).json({
        errorMessage: 'Please provide name and bio for user.'
      })
    } else {
      User.update(id, body)
      .then(info => {
        res.status(200).json(info)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          errorMessage: 'The user information could not be motified.'
        })
      })
    }
  })

})

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));