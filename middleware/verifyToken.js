const jwt = require("jsonwebtoken");
//verifytoken
const verifytoken = (req, res, next) => {
  if (req.headers.auth) {
    jwt.verify(req.headers.auth, process.env.key, (err, data) => {
      if (err) {
        res.status(403).json({ message: "wrong or expired token." });
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    res.json({ message: "not authorized as user" });
  }
};

//verifytokenadmin

const verifytokenadmin = (req, res, next) => {
  if (req.headers.auth) {
    jwt.verify(req.headers.auth, process.env.key, (err, data) => {
      if (err) {
        res.status(403).json({ message: "wrong or expired token." });
      } else {
        // data = {id: user._id, isAdmin: user.isAdmin}
        if (!data.isAdmin)
          return res.status(403).json({ message: "You are not admin" });
        req.user = data;
        next();
      }
    });
  } else {
    res.json({ message: "not authorized as admin" });
  }
};

module.exports = { verifytoken, verifytokenadmin };
