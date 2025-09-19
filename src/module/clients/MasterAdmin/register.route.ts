
import express from 'express'
import { registerController } from './register.controller';
import { registerZodValidations } from './register.validation';
import { validateRequest } from '../../../common/CustomMiddleware/validateRequest';

const router = express.Router()

router.get("/:id", registerController.getSingleUser)
router.delete("/:id", registerController.deleteUser)
router.get("/", registerController.getAllUser)
router.patch("/:id", validateRequest(registerZodValidations.registeraUpdateValidation), registerController.updateUser)
router.post("/users-create", validateRequest(registerZodValidations.registerValidation), registerController.registerUser)


export const RegisterRoutes = router;