import express from 'express';
import { adminLogin,
         managerLogin,
         userLogin,
         accountantLogin,
         supervisorLogin,
         telesalesLogin,
         rmdLogin,
         socialLogin,
         } from '../controllers/authController.js';

const router = express.Router();

router.post('/admin/login', adminLogin);
router.post('/managers/login', managerLogin);
router.post('/contact/login', userLogin);
router.post('/accountants/login', accountantLogin);
router.post('/supervisors/login', supervisorLogin);
router.post('/telesales/login', telesalesLogin);
router.post('/rmd/login', rmdLogin);
router.post('/social/login', socialLogin);

export default router;
