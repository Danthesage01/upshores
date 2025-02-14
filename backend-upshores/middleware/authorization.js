import User from "../models/User.js";

const authorizationMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    console.log(user.role);
    if (!user || !roles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Access Denied. You are not authorized!" });
    }
    next();
  };
};

export default authorizationMiddleware;
