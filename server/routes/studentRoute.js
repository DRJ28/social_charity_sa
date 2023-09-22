const {
  getAllContents_controller,
} = require("./../controllers/studentController");
const router = require("express").Router();

router.get("/getAllContent", getAllContents_controller);

module.exports = router;
