import express from 'express'
import { RegisterRoutes } from '../module/authentication/reuseable/route'
import { AuthRoutes } from '../module/authentication/auth/auth.routes'

const router = express.Router()

const moduleRoutes = [
    {
        path: "/sdfsdfsada",
        router: RegisterRoutes,
    },
    {
        path: "/auth",
        router: AuthRoutes,
    },

]

moduleRoutes.forEach(route => { router.use(route.path, route.router) })



export default router;