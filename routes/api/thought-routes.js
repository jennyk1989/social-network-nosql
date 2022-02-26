//routes to /api/users...
// get all users
// get single user by _id & populated thought & friend data
// post a new user
// put to update a user by _id
// delete to remove user by _id

//routes to /api/users/:userId/friends/:friendId...
// POST to add new freind 
// DELETE to remove friend 

// routes to /api/thoughts
// GET to get all thoughts
// GET to get single thought by _id
// POST to create new thought (push created thought's _id to associated user's thoughts array field)
// PUT to update thought by _id
// DELETE to remove thought by _id

// routes to /api/thoughts/:thoughtId/reactions:
// POST to create reaction stored in a single thought's reactions array field
// DELETE to pull & remove a reaction by the reaction's reactionId value