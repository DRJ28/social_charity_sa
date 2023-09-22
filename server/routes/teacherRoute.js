const {
  uploadContent_controller,
} = require("./../controllers/teacherController");
const router = require("express").Router();

router.post("/uploadFileContent", uploadContent_controller);

module.exports = router;
