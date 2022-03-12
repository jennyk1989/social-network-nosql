const { Thought, User } = require('../models'); //import the User model

//routes to /api/users...
const userController = {
    // get all users
    getAllUsers(req,res) {
        User.find({}) 
            .then(userdata => res.json(userdata))
            .catch(err => res.status(400).json(err));
    },
    // get single user by _id & populated thought & friend data
    getUserById({ params }, res) { //destructuring params out of req as only need params
        User.findOne({ _id: params.id })
            //populate thought and friend data:
            .populate('thoughts')
            .populate('friends')
            //use select option + minus to remove __v from results:
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
    updateUser({ params, body }, res) { //desctructuring params & body out of req
        User.findOneAndUpdate(
            //update by _id:
            { _id: params.id }, 
            body, //user info in body
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
        User.findOneAndDelete({ _id: params.id }) //delete by _id (get id out of params object)
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
    // POST to add new friend 
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            //get the user by id (user that is adding a friend)
            { _id: params.id },
            //use $addToSet instead of $push so friend is not added to friends array if already present
            { $addToSet: { friends: params.friendId }}, 
            { runValidators: true }
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
    // DELETE to remove friend 
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            //get the user by id (user that is deleting a friend)
            { _id: params.id },
            //MongoDB's pull operator to remove friend from friends array
            { $pull: { friends: params.friendId }}, //identify friend to remove by friendId
            { runValidators: true }
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
};

//export the controller 
module.exports = userController;