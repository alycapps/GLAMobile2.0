const router = require("express").Router();
const apptController = require("../../controllers/apptController");

// Matches with "/api/appts"
router.route("/")
  .get(apptController.findAll)
  .post(apptController.create);

// Matches with "/api/appts/:id"
router
  .route("/:id")
  .get(apptController.findById)
  .put(apptController.update)
  .delete(apptController.remove);

module.exports = router;
