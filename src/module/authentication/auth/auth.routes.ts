import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router()
router.post("/signUp", AuthController.register)
router.post("/signIn", AuthController.login)
router.post("/refresh-token")
router.post("/change-password")
router.post("/forget-password")
router.post("/reset-password")
export const AuthRoutes = router;