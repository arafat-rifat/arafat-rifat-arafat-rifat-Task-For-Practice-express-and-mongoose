const products = require("./../Model-Data/productModel");
// const product = require("./../Model-Data/productModel");

// ROUTE HANDALER for Tours
exports.getAllProduct = async (req, res) => {
  try {
    // BUILD QUERY
    //  1)Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(req.query, queryObj);

    // // 1-B) Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = products.find(JSON.parse(queryStr));

    // // 2)Short
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    }
    // // Exicuite query
    const product = await query;

    // Send Response
    res.status(200).json({
      status: "success",
      Time: req.requestTime,
      result: product.length,
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.createNewProduct = async (req, res) => {
  try {
    const newProduct = await products.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const product = await products.findById(req.params.id);
    // Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: "Success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      Message: "<profile Not Updated!!!>",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await products.findByIdAndDelete(req.params.id);
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
