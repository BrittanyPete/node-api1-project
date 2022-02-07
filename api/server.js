// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

//ENDPOINTS:
//GET /api/users - returns an array of users
server.get('/api/users', (req, res) => {
    //pull users from db
    Users.find()
    .then(users => {
        //throw an error:
        // throw new Error('foo error');
        //send users back to client
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({
            message: 'could not get the users',
            error: err.message
        })
    })
    
    
})
//GET /api/users/:id - returns the user object with the specified id.
//POST /api/users - creates a user using the info sent inside the request body.
//PUT /api/users/:id - Updates the user with the specified id using data from the request body. Returns the modified user.
//DELETE /api/users/:id

module.exports = server; // EXPORT YOUR SERVER instead of {}
