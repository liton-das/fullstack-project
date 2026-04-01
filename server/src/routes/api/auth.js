const {
  registerController,
  verifyOtpController,
  loginController,
  getUserProfile,
  resendOtpController,
  resetPasswordController,
  forgotPasswordController,
  searchUserController,
  updateUserProfileController,
  refreshTokenController,
  logOutController,
  getUserListsController,
} = require("../../controllers/auth/register");
const authApi = require("express").Router();
const multer = require("multer");
const authMiddleware = require("../../middlewares/authMiddleware");
const upload = multer();
authApi.post("/v1/register", registerController);
authApi.post("/v1/verify-otp", verifyOtpController);
authApi.post("/v1/resend-otp", resendOtpController);
authApi.post("/v1/login", loginController);
authApi.get("/v1/get-profile", authMiddleware, getUserProfile);
authApi.get("/v1/get-user-lists", authMiddleware, getUserListsController);
authApi.post("/v1/forgot-password", forgotPasswordController);
authApi.post("/v1/reset-password/:passwordToken", resetPasswordController);
authApi.get("/v1/search-user/:searchItems", searchUserController);
authApi.put(
  "/v1/update-profile",
  authMiddleware,
  upload.single("avatar"),
  updateUserProfileController,
);
authApi.post("/v1/refreshAccess-token", refreshTokenController);
authApi.post("/v1/logout", logOutController);
module.exports = authApi;
