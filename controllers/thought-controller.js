// import Thought, User models
const { Thought, User } = require('../models');

// routes to /api/thoughts
const thoughtController = {
    // GET to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err));
    },
    // GET to get single thought by _id
    getThoughtById({ params }, res) { //destructured params out of req object
        Thought.findOne({ _id: params.id })//find the thought by its _id
            .select('-__v') //get rid of __v from json response
            .then(thoughtData => {
                console.log(thoughtData);
                if(!thoughtData) {
                    res.status(404).json({ message: 'User data not found'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // POST to create new thought (push created thought's _id to associated user's thoughts array field)
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    //find user that new thought belongs to
                    { _id: params.userId },
                    //add the new thought (identified by _id) to the thoughts array
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'User data not found'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // PUT to update thought by _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            // find the thought to be updated by id
            { _id: params.id }, 
            body, // body contains all thought info
            { new: true, runValidators: true}
        )
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'User data not found'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // DELETE to remove thought by _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id }) //find thought to be deleted by id
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'User data not found'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // routes to /api/thoughts/:thoughtId/reactions:
    // POST to create reaction stored in a single thought's reactions array field
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            //find thought reaction belong to
            { _id: params.thoughtId },
            // add the reaction (contained in body) to the reactions array 
            { $push: { reactions: body } },
            { new: true }
        )
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'User data not found'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // DELETE to pull & remove a reaction by the reaction's reactionId value
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            //find thought reaction is associated with 
            { _id: params.thoughtId },
            //remove reaction (identified by reactionId) from reactions array
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
};

module.exports = thoughtController;