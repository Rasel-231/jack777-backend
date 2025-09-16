import express from 'express'
import { RegisterRoutes } from '../module/authentication/Register/register.route'

const router = express.Router()

const moduleRoutes = [
    {
        path: "/register",
        router: RegisterRoutes,
    },

]

moduleRoutes.forEach(route => { router.use(route.path, route.router) })



export default router;