const router = require('express').Router();

const apiRoutes = require('./api');
router.use('./api', apiRoutes);
//handle errors
router.use((req,res) => {
    res.status(404).send("<h1>😝😝😝😝 404 error 😝😝😝😝</h1>")
});

module.exports = router;