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
        });
    })
});

//GET /api/users/:id - returns the user object with the specified id.
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await Users.find()
        res.json(user)
    } catch (err) {
        res.status(500).json({
            message: 'could not get the user',
            error: err.message,
        })
    }
});

//POST /api/users - creates a user using the info sent inside the request body.
server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'name and bio are both required'
            })
        } else {
            const newUser = await Users.insert(req.body)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: 'error posting new user',
            error: err.message,
        });
    }
});

//PUT /api/users/:id - Updates the user with the specified id using data from the request body. Returns the modified user.

//DELETE /api/users/:id


module.exports = server; // EXPORT YOUR SERVER instead of {}
