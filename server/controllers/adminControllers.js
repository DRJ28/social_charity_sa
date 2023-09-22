const { getAllUser, approveEntryByAdmin } = require("./../Utils/dbConnect");

module.exports.getAllUserDetails_controller = async (req, res) => {
  try {
    const loggedinUser = req.headers["loggedin-user"];
    const dbResponse = await getAllUser();
    console.log(dbResponse);

    return res.status(200).json({ data: dbResponse });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error occurred",
    });
  }
};

module.exports.approveEntry_controller = async (req, res) => {
  try {
    const loggedinUser = req.headers["loggedin-user"];
    const dbResponse = await approveEntryByAdmin(req.body, loggedinUser);
    console.log(dbResponse);

    return res.status(200).json({ data: { status: "approved" } });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error occurred",
    });
  }
};
