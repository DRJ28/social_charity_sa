const {
  getUserDetails_controller,
  getPendingApprovals_controller,
} = require("./../controllers/userControllers");
// const { adminAuthentication } = require("../middlewares/authentication");
// const { requireLogin } = require("../middlewares/requireLogin");

const router = require("express").Router();

router.post("/getUserDetails", getUserDetails_controller);
router.get("/getPendingApprovals", getPendingApprovals_controller);

// router.get(
//   "/teacher",
//   requireLogin,
//   adminAuthentication,
//   getTeacher__controller
// );

module.exports = router;
