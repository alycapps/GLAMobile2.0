const router = require("express").Router();
// const bookRoutes = require("./books");
const stylistRoutes = require("./users");
const apptRoutes = require("./appts");

// // Book routes
// router.use("/books", bookRoutes);
// Stylist routes
router.use("/users/stylists", stylistRoutes);
// Appt routes
router.use("/appts", apptRoutes);

module.exports = router;