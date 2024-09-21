import express from 'express';
import { signUp, login ,verifyOtp} from '../controllers/adminController.js';

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);


export default router;
