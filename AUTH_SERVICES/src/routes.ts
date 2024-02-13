import express from 'express';
import SessionCtrl from '../src/controller/session-ctrl';

const sessionCtrl = new SessionCtrl();
const router = express.Router();

router.post('/create-session', sessionCtrl.create);
router.get('/verification-session', sessionCtrl.verification);



export default router;
