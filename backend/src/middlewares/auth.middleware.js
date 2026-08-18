const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message:
          "You don't have access to create music or an album",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.log(err.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

async function authUser(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (
      decoded.role !== "user" &&
      decoded.role !== "artist"
    ) {
      return res.status(403).json({
        message: "You don't have access",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = {
  authArtist,
  authUser,
};