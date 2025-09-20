import express from 'express'
import { AuthRoutes } from '../module/authentication/auth/auth.routes'
import { UserRoutes } from '../module/clients/Users/user.route'

const router = express.Router()

const moduleRoutes = [
    {
        path: "/users",
        router: UserRoutes,
    },
    {
        path: "/auth",
        router: AuthRoutes,
    },

]

moduleRoutes.forEach(route => { router.use(route.path, route.router) })



export default router;