import jwt from "jsonwebtoken";

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access token not found or missing Bearer prefix!" });
  }

  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not found!" });
  }
  try {
    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.accessToken = { value: accessToken, exp: decodedAccessToken.exp };
    req.user = { userId: decodedAccessToken.userId };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ message: "Access token expired!", code: "AccessTokenExpired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Access token invalid!", code: "AccessTokenInvalid" });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};
export default authenticationMiddleware;
