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
            .catch(err => res.status(400).json(err))
    },
    // post a new user
    createUser({ body }, res) { //destructuring body out of the req object
        User.create(body)
            .then(userdata => res.json(userdata))
            .catch(err => res.status(400).json(err))
    },
    // put to update a user by _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true, runValidators: true } //want updated (new) User returned and want it validated
        )
            .then(userdata => {
                if(!userdata) {
                    res.status(404).json({ message: 'User not found'});
                    return;
                }
                res.json(userdata);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete to remove user by _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userdata => {
                if(!userdata) {
                    res.status(404).json({ message: 'User not found'});
                    return;
                }
                res.json(userdata);
            })
            .catch(err => res.status(400).json(err));
    },
    //routes to /api/users/:userId/friends/:friendId...
    // POST to add new freind 
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId }}, //MongoDB's push operator to add friend to friends array
            { new: true, runValidators: true }
        )
        .populate({
            path: 'friends',
            select: ('-__V')
        })
        .select('-__v')
        .then(userdata => {
            if(!userdata) {
                res.status(404).json({ message: 'User not found'});
                return;
            }
            res.json(userdata);
        })
        .catch(err => res.status(400).json(err));
    },
    // DELETE to remove friend 
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId }}, //MongoDB's pull operator to remove friend from friends array
            { new: true }
        )
        .populate({
            path: 'friends',
            select: ('-__V')
        })
        .select('-__v')
        .then(userdata => {
            if(!userdata) {
                res.status(404).json({ message: 'User not found'});
                return;
            }
            res.json(userdata);
        })
        .catch(err => res.status(400).json(err));
    },
};

module.exports = userController;