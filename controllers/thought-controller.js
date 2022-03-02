// import Thought, User models
const { Thought, User } = require('../models');

// routes to /api/thoughts
const thoughtControlller = {
    // GET to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err));
    },
    // GET to get single thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'User data not found'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // POST to create new thought (push created thought's _id to associated user's thoughts array field)
    createThought() {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
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
            .catch(err => res.json(err));
    },
    // PUT to update thought by _id
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            body, 
            { new: true, runValidators: true}
        )
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'User data not found'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },
    // DELETE to remove thought by _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deleteData => {
                if(!deleteData) {
                    res.status(404).json({ message: 'User data not found'});
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
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
            .catch(err => res.json(err));
    },
    // routes to /api/thoughts/:thoughtId/reactions:
    // POST to create reaction stored in a single thought's reactions array field
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
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
        .catch(err => res.json(err));
    },
    // DELETE to pull & remove a reaction by the reaction's reactionId value
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
};

module.exports = thoughtControlller;