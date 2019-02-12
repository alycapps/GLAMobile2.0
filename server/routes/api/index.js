const router = require("express").Router();
const stylistRoutes = require("./users");
const apptRoutes = require("./appts");

// Stylist routes
router.use("/users/stylists", stylistRoutes);
// Appt routes
router.use("/appts", apptRoutes);

module.exports = router;