
import express from 'express'
import { MasterAdminController } from './masterAdmin.controller';
import { validateRequest } from '../../../common/CustomMiddleware/validateRequest';
import { MasterAdminZodValidations } from './masterAdmin.validation';
import auth from '../../authentication/authGuard/auth';
import { ENUM_USER_ROLE } from '../../../enums/enum';

const router = express.Router()

router.get("/:id", auth(ENUM_USER_ROLE.SUPER_ADMIN), MasterAdminController.getSingleMasterAdmin)
router.delete("/:id", auth(ENUM_USER_ROLE.SUPER_ADMIN), MasterAdminController.deleteMasterAdmin)
router.get("/", auth(ENUM_USER_ROLE.SUPER_ADMIN), MasterAdminController.getAllMasterAdmin)
router.patch("/:id", auth(ENUM_USER_ROLE.SUPER_ADMIN), validateRequest(MasterAdminZodValidations.MasterAdminaUpdateValidation), MasterAdminController.updateMasterAdmin)
router.post("/create", auth(ENUM_USER_ROLE.SUPER_ADMIN), validateRequest(MasterAdminZodValidations.MasterAdminValidation), MasterAdminController.CreateMasterAdmin)


export const MasterAdminRoutes = router;