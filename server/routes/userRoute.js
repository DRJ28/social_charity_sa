const {
  getUserDetails_controller,
  getPendingApprovals_controller,
  insertUpdateDetails_controller,
} = require("./../controllers/userControllers");
const router = require("express").Router();

router.post("/getUserDetails", getUserDetails_controller);
router.post("/insertUpdateDetails", insertUpdateDetails_controller);
router.get("/getPendingApprovals", getPendingApprovals_controller);

// router.get(
//   "/teacher",
//   requireLogin,
//   adminAuthentication,
//   getTeacher__controller
// );

module.exports = router;
