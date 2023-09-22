const { getUserFromEmail, insertUpdateUser } = require("./../Utils/dbConnect");

module.exports.getUserDetails_controller = async (req, res, next) => {
  try {
    const { email, family_name, given_name } = req.body;
    const dbResponse = await getUserFromEmail(email);
    dbInfo = {};
    if (dbResponse.length === 0) {
      dbInfo = {
        ISAPPROVED: null,
        first_name: given_name,
        last_name: family_name,
        USER_EMAILADDRESS: email,
      };
    } else {
      dbInfo = dbResponse[0];
    }
    return res.status(200).json(dbInfo);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error occurred",
    });
  }
};

module.exports.insertUpdateDetails_controller = async (req, res, next) => {
  try {
    const loggedinUser = req.headers["loggedin-user"];
    const dbResponse = await insertUpdateUser(req.body, loggedinUser);
    console.log(dbResponse);

    return res
      .status(200)
      .json({ msg: "user pending for approval", ISAPPROVED: "pending" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error occurred",
    });
  }
};

module.exports.getPendingApprovals_controller = async (req, res) => {
  try {
    // TODO connect db and get "pending" approval list
    return res.status(200).json([
      { first_name: "John", last_name: "Cena", email: "johncena@gmail.com" },
      { first_name: "John", last_name: "Cena", email: "johncena@gmail.com" },
      { first_name: "John", last_name: "Cena", email: "johncena@gmail.com" },
      { first_name: "John", last_name: "Cena", email: "johncena@gmail.com" },
    ]);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error occurred",
    });
  }
};
