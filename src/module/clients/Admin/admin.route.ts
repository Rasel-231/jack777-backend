
import express from 'express'
import { AdminController } from './admin.controller';
import { AdminZodValidations } from './admin.validation';
import { validateRequest } from '../../../common/CustomMiddleware/validateRequest';
import auth from '../../authentication/authGuard/auth';
import { ENUM_USER_ROLE } from '../../../enums/enum';

const router = express.Router()

router.get("/:id", auth(ENUM_USER_ROLE.MASTER_ADMIN), AdminController.getSingleAdmin)
router.delete("/:id", auth(ENUM_USER_ROLE.MASTER_ADMIN), AdminController.deleteAdmin)
router.get("/", auth(ENUM_USER_ROLE.MASTER_ADMIN), AdminController.getAllAdmin)
router.patch("/:id", auth(ENUM_USER_ROLE.MASTER_ADMIN), validateRequest(AdminZodValidations.AdminaUpdateValidation), AdminController.updateAdmin)
router.post("/create", auth(ENUM_USER_ROLE.MASTER_ADMIN), validateRequest(AdminZodValidations.AdminValidation), AdminController.CreateAdmin)


export const AdminRoutes = router;