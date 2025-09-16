
import express from 'express'
import { registerController } from './register.controller';

const router = express.Router()

router.get("/:id", registerController.getSingleUser)
router.delete("/:id", registerController.deleteUser)
router.get("/", registerController.getAllUser)
router.patch("/:id", registerController.updateUser)

router.post("/users-create", registerController.registerUser)


export const RegisterRoutes = router;