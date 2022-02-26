const { getAllUser, addFriend, deleteFriend } = require('../../controllers/user-controller');

const router = require('express').Router();

//importing controller functionality 
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// routes to /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// routes to /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// routes to /api/users/:userId/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.export = router;