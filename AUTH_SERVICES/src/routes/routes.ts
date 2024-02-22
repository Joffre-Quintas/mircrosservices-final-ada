import express from 'express';
import CreateSessionCtrl from '../controller/createSessionCtrl';
import VerificationSessionCtrl from '../controller/verificationSessionCtrl';

import validationSchema from '../middleware/validationSchema'

import { createSessionSchema } from '../schema/createSessionSchema'


const SessionCtrl = new CreateSessionCtrl();
const router = express.Router();

router.post('/create-session', validationSchema(createSessionSchema), CreateSessionCtrl.createSession)
router.post('/verification-session', VerificationSessionCtrl.verification);



export default router;
