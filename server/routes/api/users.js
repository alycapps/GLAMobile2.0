const router = require("express").Router();
const stylistsController = require("../../controllers/stylistController");

console.log(stylistsController.findAll);

// Matches with "/api/users/stylists"
router
  .route("/")
  .get(stylistsController.findAll)
  .post(stylistsController.create)

// Matches with "/api/users/stylists/:id"
router
  .route("/:id")
  .get(stylistsController.findById)
  .put(stylistsController.update);

// Matches with "/api/users/stylists/rates/:id"
router
  .route("/rates/:id")
  .put(stylistsController.updateRates);

  // .delete(stylistsController.remove);

module.exports = router;