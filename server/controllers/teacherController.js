const { uploadContentTeacher } = require("./../Utils/dbConnect");

module.exports.uploadContent_controller = async (req, res) => {
  try {
    const loggedinUser = req.headers["loggedin-user"];
    const dbResponse = await uploadContentTeacher(req.body, loggedinUser);
    console.log(dbResponse);
    return res.status(200).json({ data: { status: "submitted" } });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error occurred",
    });
  }
};
