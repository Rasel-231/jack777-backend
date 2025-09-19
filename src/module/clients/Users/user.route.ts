
import express from 'express'
import { UserController } from './user.controller';
import { UserZodValidations } from './user.validation';
import { validateRequest } from '../../../common/CustomMiddleware/validateRequest';

const router = express.Router()

router.get("/:id", UserController.getSingleUser)
router.delete("/:id", UserController.deleteUser)
router.get("/", UserController.getAllUser)
router.patch("/:id", validateRequest(UserZodValidations.UseraUpdateValidation), UserController.updateUser)
router.post("/users-create", validateRequest(UserZodValidations.UserValidation), UserController.UserUser)


export const UserRoutes = router;