const router = require("express").Router();
const iconsController = require("../../controllers/iconsController");

// Matches with "/api/coins"
router.route("/")
  .get(iconsController.findAll)
  .put(iconsController.update)

// Matches with "/api/coins/:id"
// router.route("/:id")
//   .put(iconsController.update)


module.exports = router;