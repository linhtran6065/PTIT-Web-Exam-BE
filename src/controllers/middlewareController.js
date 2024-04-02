var jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }
    try {
      const decoded = jwt.verify(
        token.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET
      );
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  },

  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json({ message: "You are not allowed!" });
      }
    });
  },
};

module.exports = middlewareController;
