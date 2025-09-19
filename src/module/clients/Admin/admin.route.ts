
import express from 'express'
import { AdminController } from './admin.controller';
import { AdminZodValidations } from './admin.validation';
import { validateRequest } from '../../../common/CustomMiddleware/validateRequest';

const router = express.Router()

router.get("/:id", AdminController.getSingleUser)
router.delete("/:id", AdminController.deleteUser)
router.get("/", AdminController.getAllUser)
router.patch("/:id", validateRequest(AdminZodValidations.AdminaUpdateValidation), AdminController.updateUser)
router.post("/users-create", validateRequest(AdminZodValidations.AdminValidation), AdminController.AdminUser)


export const AdminRoutes = router;