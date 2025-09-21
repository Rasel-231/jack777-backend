
import express from 'express'
import { SuperAdminController } from './superAdmin.controller';
import { SuperAdminZodValidations } from './superAdmin.validation';
import { validateRequest } from '../../../common/CustomMiddleware/validateRequest';

const router = express.Router()

router.get("/:id", SuperAdminController.getSingleUser)
router.delete("/:id", SuperAdminController.deleteUser)
router.get("/", SuperAdminController.getAllUser)
router.patch("/:id", validateRequest(SuperAdminZodValidations.SuperAdminaUpdateValidation), SuperAdminController.updateUser)
router.post("/create", validateRequest(SuperAdminZodValidations.SuperAdminValidation), SuperAdminController.CreateSuperAdmin)


export const SuperAdminRoutes = router;