import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../../common/CustomMiddleware/validateRequest";
import { Authvalidation } from "./auth.validation";
import auth from "../authGuard/auth";
import { ENUM_USER_ROLE } from "../../../enums/enum";



const router = express.Router()

router.post("/register", validateRequest(Authvalidation.registerZodValidation), AuthController.register)
router.post("/login", validateRequest(Authvalidation.loginZodValidation), AuthController.login)
router.post("/refresh-token", validateRequest(Authvalidation.refreshZodValidation), AuthController.refreshToken)
router.patch("/change-password", validateRequest(Authvalidation.passwordChangeZodValidation), auth(ENUM_USER_ROLE.ADMIN), AuthController.passwordChanged)
router.post("/forget-password", AuthController.forgetPassword)
router.post("/reset-password", AuthController.resetPassword)
router.post("/logout", AuthController.Logout)

export const AuthRoutes = router;


// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.MASTER_ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),