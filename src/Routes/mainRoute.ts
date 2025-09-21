import express from 'express'
import { AuthRoutes } from '../module/authentication/auth/auth.routes'
import { UserRoutes } from '../module/clients/Users/user.route'
import { WalletRoutes } from '../module/wallet/AgentWallet/walletRoutes'
import { SuperAdminRoutes } from '../module/clients/SuperAdmin/superAdmin.route'
import { MasterAdminRoutes } from '../module/clients/MasterAdmin/masterAdmin.route'
import { AdminRoutes } from '../module/clients/Admin/admin.route'

const router = express.Router()

const moduleRoutes = [
    {
        path: "/users",
        router: UserRoutes,
    },
    {
        path: "/super-admin",
        router: SuperAdminRoutes,
    },
    {
        path: "/master-admin",
        router: MasterAdminRoutes,
    },
    {
        path: "/admin",
        router: AdminRoutes,
    },
    {
        path: "/auth",
        router: AuthRoutes,
    },
    {
        path: "/wallet",
        router: WalletRoutes,
    },



]

moduleRoutes.forEach(route => { router.use(route.path, route.router) })



export default router;