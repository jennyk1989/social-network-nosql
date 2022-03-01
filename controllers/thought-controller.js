// import Thought, User models
const { Thought, User } = require('../models');

// routes to /api/thoughts
const thoughtControlller = {
    // GET to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err));
    },
    // GET to get single thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
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

    },
    // PUT to update thought by _id
    updateThought() {

    },
    // DELETE to remove thought by _id
    deleteThought() {

    },
    // routes to /api/thoughts/:thoughtId/reactions:
    // POST to create reaction stored in a single thought's reactions array field
    createReaction() {

    },
    // DELETE to pull & remove a reaction by the reaction's reactionId value
    deleteReaction() {

    },
};

module.exports = thoughtControlller;