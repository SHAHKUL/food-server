const productController = require("express").Router();
const Product = require("../model/Product");
const { verifytoken, verifytokenadmin } = require("../middleware/verifyToken");

productController.get("/", verifytoken, async (req, res) => {
  try {
    const prod = await Product.find(req.query);
    res.status(200).json(prod);
  } catch (error) {
    console.log(error);
  }
});

productController.get("/find/:id", verifytoken, async (req, res) => {
  try {
    const { id } = req.params;
    const prod = await Product.findById({ _id: id });
    if (!prod) {
      res.status(500).json({ message: "no product with such id" });
    }
    res.status(200).json(prod);
  } catch (error) {
    console.log(error);
  }
});

productController.post("/", verifytokenadmin, async (req, res) => {
  try {
    const prod = await Product.create({ ...req.body });
    res.status(200).json(prod);
  } catch (error) {
    console.log(error);
  }
});

productController.put("/update/:id", verifytokenadmin, async (req, res) => {
  const{id}=req.params
  try {
    const prod = await Product.findByIdAndUpdate({_id:id},{...req.body})
    res.status(200).json(prod);
  } catch (error) {
    console.log(error);
  }
});

productController.delete("/del/:id", verifytokenadmin, async (req, res) => {
  const{id}=req.params
  try {
    const prod = await Product.findByIdAndDelete({_id:id})
    res.status(200).json(prod);
  } catch (error) {
    console.log(error);
  }
});


module.exports=productController