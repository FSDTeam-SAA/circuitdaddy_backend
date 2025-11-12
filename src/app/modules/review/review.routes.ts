import express from 'express';
import auth from '../../middlewares/auth';
import userRole from '../user/user.constan';
import { reviewController } from './review.controller';
const router = express.Router();

router.post('/', auth(userRole.User), reviewController.createReview);
router.get('/:id', reviewController.getEngineerAllReviews);
router.put('/:reviewId', auth(userRole.User), reviewController.updateReview);
router.delete('/:reviewId', auth(userRole.User), reviewController.deleteReview);

export const reviewRouter = router;
