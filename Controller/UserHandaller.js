const User = require("./../Model-Data/UserModel");

// ROUTE HANDALER for Tours
exports.getAllUsers = async (req, res) => {
  try {
    // BUILD QUERY
    //  1)Filtering
    const queryObjSecond = { ...req.query };
    const excludedFieldsSecond = ["page", "sort", "limit", "fields"];
    excludedFieldsSecond.forEach((el) => delete queryObjSecond[el]);
    console.log(req.query, queryObjSecond);

    // // 1-B) Advance Filtering
    let queryStr = JSON.stringify(queryObjSecond);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = User.find(JSON.parse(queryStr));

    // // 2)Short
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    }
    // // Exicuite query
    const user = await query;

    // Send Response
    res.status(200).json({
      status: "success",
      Time: req.requestTime,
      result: user.length,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.createNewUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      Message: "<profile Not Updated!!!>",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Delete Success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "ID Not exists",
    });
  }
};
