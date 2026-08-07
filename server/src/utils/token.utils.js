import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "./APIError.js";

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION,
} = env;

if (
  !ACCESS_TOKEN_SECRET ||
  !REFRESH_TOKEN_SECRET ||
  !ACCESS_TOKEN_EXPIRATION ||
  !REFRESH_TOKEN_EXPIRATION
) {
  throw new Error("JWT configuration is missing.");
}

const generateToken = (payload, secret, expiresIn) => {
  if (!payload) {
    throw new Error("Token payload is required.");
  }

  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    throw new ApiError(401, "Invalid or expired token.");
  }
};

export const generateAccessToken = (payload) =>
  generateToken(payload, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION);

export const generateRefreshToken = (payload) =>
  generateToken(payload, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION);

export const verifyAccessToken = (token) =>
  verifyToken(token, ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token) =>
  verifyToken(token, REFRESH_TOKEN_SECRET);
