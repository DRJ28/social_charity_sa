module.exports.getUserDetails_controller = async (req, res, next) => {
  try {
    // TODO connect db and get info for emailid
    console.log(req.body);
    const { email, family_name, given_name } = req.body;
    return res.status(200).json({
      role: "admin", // pending, teacher, student
      first_name: "Dheeraj",
      last_name: "Mehta",
      email,
    });
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
