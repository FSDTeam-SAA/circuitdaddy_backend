import express from 'express';
import auth from '../../middlewares/auth';
import userRole from '../user/user.constan';
import { serviceController } from './service.controller';
const router = express.Router();

router.post('/', auth(userRole.Admin), serviceController.createService);
router.get('/', serviceController.getAllServices);

export const serviceRoutes = router;
