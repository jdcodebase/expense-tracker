import User from "../models/user.model.js";
import ApiError from "../utils/APIError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/token.utils.js";

export const authenticateToken = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new ApiError(401, "Access token is missing.");
  }

  const decoded = verifyAccessToken(accessToken);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  req.user = user;

  next();
});
