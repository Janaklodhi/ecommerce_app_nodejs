const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const decodedToken = jwt.verify(token, "secret");
    // req.user_Data = decodedToken;
    const userId = decodedToken.userId;
    req.userId = userId;
    console.log(userId);
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Invalid or expired token",
      errors: e,
    });
  }
}

module.exports = {
  checkAuth: checkAuth,
};
