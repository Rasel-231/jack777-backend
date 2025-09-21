import express from 'express'
import { WalletController } from './walletController'
import auth from '../../authentication/authGuard/auth'
const router = express.Router()
router.post('/deposit', auth(), WalletController.deposit)
router.post('/withdraw', auth(), WalletController.withdraw)
export const WalletRoutes = router