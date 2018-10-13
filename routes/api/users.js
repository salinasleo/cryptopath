const router = require("express").Router();
const coinsController = require("../../controllers/coinsController");

// Matches with "/api/users"
router.route("/")
  .get(coinsController.findAll)
  .post(coinsController.create);

// Matches with "/api/users/:id"
router.route("/:id")
  .get(coinsController.findById)
  .put(coinsController.update)
  .delete(coinsController.remove);

module.exports = router;