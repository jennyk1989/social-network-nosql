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
        Thought.findOne({ _id: params.thoughtId }) //find the thought by its _id
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'User data not found'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // POST to create new thought (push created thought's _id to associated user's thoughts array field)
    createThought() {
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
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate(
            // find the thought to be updated by id (thoughtId)
            { _id: params.thoughtId }, 
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
        Thought.findOneAndDelete({ _id: params.thoughtId }) //find thought to be deleted by thoughtId
            .then(deleteData => {
                if(!deleteData) {
                    res.status(404).json({ message: 'User data not found'});
                    return;
                }
                return User.findOneAndUpdate(
                    // find User that thought belongs to
                    { _id: params.userId },
                    // remove the thought from the thoughts array
                    { $pull: { thoughts: params.thoughtId }},
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
    // routes to /api/thoughts/:thoughtId/reactions:
    // POST to create reaction stored in a single thought's reactions array field
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            //find thought reaction belong to
            { _id: params.thoughtId },
            // add the reaction (contained in body) to the reactions array 
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
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
            { runValidators: true, new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
};

module.exports = thoughtController;