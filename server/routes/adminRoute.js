const {
  getAllUserDetails_controller,
} = require("./../controllers/adminControllers");
const router = require("express").Router();

router.get("/getAllUserDetails", getAllUserDetails_controller);

module.exports = router;
