const { getAllUser } = require("./../Utils/dbConnect");

module.exports.getAllUserDetails_controller = async (req, res, next) => {
  try {
    const dbResponse = await getAllUser();
    return res.status(200).json(dbResponse);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error occurred",
    });
  }
};
