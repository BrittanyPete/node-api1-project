// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

//ENDPOINTS:

//POST /api/users - creates a user using the info sent inside the request body.
server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        } else {
            const newUser = await Users.insert(req.body);
            res.status(201).json(newUser);
        }
    } catch (err) {
        res.status(500).json({
            message: 'There was an error while saving the user to the database',
            error: err.message,
        });
    }
});

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
            message: 'The users information could not be retrieved'
        });
    })
});

//GET /api/users/:id - returns the user object with the specified id.
server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findById(id)
        if (!user) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist',
            })
        } else {
            res.json(user)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The user information could not be retrieved',
            error: err.message,
        })
    }
});


//DELETE /api/users/:id
server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    Users.remove(id)
    .then(deletedUser => {
        if (deletedUser == null) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
            return;
        } else {
            res.json(deletedUser)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'The user could not be removed',
            error: err.message,
        })
    })
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
