const router = require("express").Router();
const { usersController } = require("../../controllers");
const { userValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

//////////////////// COMMON ROUTES ////////////////////
router.get(
  "/authenticate",
  userValidator.validateAuthenticateUser,
  auth("readOwn", "user", true),
  usersController.authenticateUser
);

router
  .route("/email/verify")
  .get(
    auth("readOwn", "emailVerificationCode", true),
    usersController.resendEmailOrPhoneVerificationCode("email")
  )
  .post(
    userValidator.validateCode,
    auth("updateOwn", "emailVerificationCode", true),
    usersController.verifyEmailOrPhone("email")
  );

router.post(
  "/verification/email/check-code",
  userValidator.validateCode,
  auth("readOwn", "emailVerificationCode", true),
  usersController.checkCode("email")
);

router.get(
  "/email/verify/fast",
  userValidator.validateVerifyEmailByLink,
  usersController.verifyEmailByLink
);

router
  .route("/phone/verify")
  .get(
    auth("readOwn", "phoneVerificationCode", true),
    usersController.resendEmailOrPhoneVerificationCode("phone")
  )
  .post(
    userValidator.validateCode,
    auth("updateOwn", "phoneVerificationCode", true),
    usersController.verifyEmailOrPhone("phone")
  );

router.post(
  "/verification/phone/check-code",
  userValidator.validateCode,
  auth("readOwn", "phoneVerificationCode", true),
  usersController.checkCode("phone")
);

router
  .route("/password/forgot")
  .get(
    userValidator.validateSendForgotPasswordCode,
    usersController.sendForgotPasswordCode
  )
  .post(
    userValidator.validateHanfleForgotPassword,
    usersController.handleForgotPassword
  );

router.patch(
  "/password/change",
  userValidator.validateChangePassword,
  auth("updateOwn", "password"),
  usersController.changePassword
);

router.patch(
  "/profile/update",
  userValidator.validateUpdateProfile,
  auth("updateOwn", "user"),
  usersController.updateProfile
);

router.delete(
  "/profile/avatar/delete",
  auth("updateOwn", "user"),
  usersController.deleteUserAvatar
);

router.patch(
  "/profile/language/switch",
  auth("updateOwn", "user"),
  usersController.switchLanguage
);

router.get(
  "/notifications/see",
  auth("readOwn", "notification"),
  usersController.seeNotifications
);

router.delete(
  "/notifications/clear",
  auth("deleteOwn", "notification"),
  usersController.clearNotifications
);

router.get(
  "/account/deletion/request",
  auth("deleteOwn", "user", true),
  usersController.requestAccountDeletion
);

router.post(
  "/account/deletion/check-code",
  userValidator.validateCode,
  auth("readOwn", "user", true),
  usersController.checkCode("deletion")
);

router.get(
  "/account/deletion/confirm",
  userValidator.validateConfirmAccountDeletion,
  usersController.confirmAccountDeletion
);

//////////////////// ADMIN ROUTES ////////////////////
router.patch(
  "/admin/profile/update",
  userValidator.validateUpdateUserProfile,
  auth("updateAny", "user"),
  usersController.updateUserProfile
);

router.patch(
  "/admin/role/change",
  userValidator.validateUpdateUserRole,
  auth("updateAny", "user"),
  usersController.changeUserRole
);

router.patch(
  "/admin/user/verify",
  userValidator.validateVerifyUser,
  auth("updateAny", "user"),
  usersController.verifyUser
);

router.get(
  "/admin/user/find",
  userValidator.validateFindUserByEmailOrPhone,
  auth("readAny", "user"),
  usersController.findUserByEmailOrPhone
);

router.get(
  "/export",
  auth("readAny", "user"),
  usersController.exportUsersToExcel
);

router.post(
  "/admin/notifications/send",
  userValidator.validateSendNotification,
  auth("createAny", "notification"),
  usersController.sendNotification
);

router.get(
  "/admin/most-used",
  userValidator.validateGetMostUsedUsers,
  auth("readAny", "user"),
  usersController.getMostUsedUsers
);

module.exports = router;
