const router = require("express").Router();
const Users = require("./users");

// User routes
router.use("/users", Users);

module.exports = router;