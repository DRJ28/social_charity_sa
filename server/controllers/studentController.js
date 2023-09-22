const { getAllContents } = require("./../Utils/dbConnect");

module.exports.getAllContents_controller = async (req, res) => {
  try {
    const loggedinUser = req.headers["loggedin-user"];
    const dbResponse = await getAllContents();
    console.log(dbResponse);

    return res.status(200).json({ data: dbResponse });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error occurred",
    });
  }
};
