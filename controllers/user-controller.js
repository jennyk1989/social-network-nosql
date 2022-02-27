const { User } = require('../models'); //import the User model

//routes to /api/users...
const userController = {
    
    // get all users
    getAllUsers() {
        
    },
    // get single user by _id & populated thought & friend data
    getUserById() {

    },
    // post a new user
    createUser() {

    },
    // put to update a user by _id
    updateUser() {

    },
    // delete to remove user by _id
    deleteUser() {

    },
    //routes to /api/users/:userId/friends/:friendId...
    // POST to add new freind 
    addFriend() {

    },
    // DELETE to remove friend 
    deleteFriend() {

    },
};

module.exports = userController;