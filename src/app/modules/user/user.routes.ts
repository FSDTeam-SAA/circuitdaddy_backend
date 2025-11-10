import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { fileUploader } from '../../helper/fileUploder';
import userRole from './user.constan';

const router = express.Router();

router.post('/create-user', userController.createUser);
router.get('/all-user', userController.getAllUser);
router.get(
  '/profile',
  auth(userRole.User, userRole.Engineer, userRole.Admin),
  userController.getMyProfile,
);

router.put(
  '/update-my-profile',
  auth(userRole.User, userRole.Engineer, userRole.Admin),
  fileUploader.upload.single('profileImage'),
  userController.updateMyProfile,
);

router.get('/get-user/:id', auth(userRole.Admin), userController.getUserById);

router.put(
  '/update-user/:id',
  auth(userRole.Admin),
  fileUploader.upload.single('profileImage'),
  userController.updateUserById,
);

router.delete(
  '/delete-user/:id',
  auth(userRole.Admin),
  userController.deleteUserById,
);

export const userRoutes = router;
