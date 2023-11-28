const authController = require("express").Router();
const User = require("../model/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

authController.get("/register", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

authController.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({ message: "already user exist enter another email id" });
    }
    const salt = bcryptjs.genSaltSync(10);
    const hashsync = bcryptjs.hashSync(req.body.password, salt);

    const newuser = await User.create({ ...req.body, password: hashsync });

    const { password, ...others} = newuser._doc;

    const token = jwt.sign(
      { id: newuser._id, isAdmin: newuser.isAdmin },
      process.env.key,
      { expiresIn: "5h" }
    );
    res.status(201).json({ others, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

authController.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const comparesync = bcryptjs.compareSync(
        req.body.password,
        user.password
      );
      if (comparesync) {
        const { password,isAdmin, ...others } = user._doc;

        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.key,
          { expiresIn: "5h" }
        );
        res.status(201).json({ others, token,isAdmin });
      } else {
        res.json({ message: "password is nto matched" });
      }
    } else {
      res.json({ message: "there is no such user exist" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  } 
});

module.exports = authController;
