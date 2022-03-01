const { User } = require('../models'); //import the User model

//routes to /api/users...
const userController = {
    
    // get all users
    getAllUsers() {
        User.find({}) //mongoose's find() method
            .populate({
                path: 'thoughts', //populating the thoughts field
                select: '-__v' //don't want __v field returned
            })
            .populate({
                path: 'friends', //populating the friends field
                select: '-__v'
            })
            .select('-__V')
            .sort({_id: -1}) //want newest User to show up first
            .then(userdata => res.json(userdata))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get single user by _id & populated thought & friend data
    getUserById({ params }, res) { //destructuring params out of req as only need params
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(userdata => {
                if(!userdata) {
                    res.status(404).json({ message: 'User not found'});
                    return;
                };
                res.json(userdata);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
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