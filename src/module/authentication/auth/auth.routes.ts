import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../../common/CustomMiddleware/validateRequest";
import { Authvalidation } from "./auth.validation";

const router = express.Router()

router.post("/signUp", AuthController.register)
router.post("/signIn", validateRequest(Authvalidation.loginZodValidation), AuthController.login)
router.post("/refresh-token", validateRequest(Authvalidation.refreshZodValidation), AuthController.refreshToken)
router.post("/change-password")
router.post("/forget-password")
router.post("/reset-password")

export const AuthRoutes = router;