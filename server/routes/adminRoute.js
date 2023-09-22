const {
  getAllUserDetails_controller,
  approveEntry_controller,
} = require("./../controllers/adminControllers");
const router = require("express").Router();

router.get("/getPendingApprovals", getAllUserDetails_controller);
router.post("/approveEntry", approveEntry_controller);

module.exports = router;
