import { IAuth } from "../module/authentication/auth/auth.interface";



declare global {
    namespace Express {
        interface Request {
            user?: IAuth;
        }
    }
}
