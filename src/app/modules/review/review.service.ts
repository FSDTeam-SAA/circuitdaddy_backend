import Review from './review.model';
import Project from '../project/project.model';
import User from '../user/user.model';
import AppError from '../../error/appError';

// ===================== CREATE REVIEW =====================
const addReview = async (
  clientId: string,
  projectId: string,
  engineerId: string,
  rating: number,
  review: string,
) => {
  const user = await User.findById(clientId);
  if (!user) throw new AppError(404, 'User not found');

  const project = await Project.findById(projectId);
  if (!project) throw new AppError(404, 'Project not found');

  if (project.client.toString() !== clientId) {
    throw new AppError(403, 'Only the project owner can review');
  }

  if (project.status !== 'completed') {
    throw new AppError(400, 'You can only review completed projects');
  }

  if (!project.approvedEngineers?.some((id) => id.equals(engineerId))) {
    throw new AppError(400, 'This engineer did not work on this project');
  }

  // Check if already reviewed
  const existing = await Review.findOne({
    project: projectId,
    engineer: engineerId,
  });
  if (existing)
    throw new AppError(
      400,
      'You already reviewed this engineer for this project',
    );

  // Create new review
  const newReview = await Review.create({
    project: projectId,
    client: clientId,
    engineer: engineerId,
    rating,
    review,
  });

  // Update engineer stats
  const engineer = await User.findById(engineerId);
  if (engineer) {
    engineer.totalRating = (engineer.totalRating || 0) + rating;
    engineer.ratingCount = (engineer.ratingCount || 0) + 1;
    engineer.avgRating = engineer.totalRating / engineer.ratingCount;
    engineer.completedProjectsCount =
      (engineer.completedProjectsCount || 0) + 1;
    await engineer.save();
  }

  return newReview;
};

// ===================== GET ENGINEER REVIEWS =====================
const getEngineerReviews = async (engineerId: string) => {
  const reviews = await Review.find({ engineer: engineerId })
    .populate('client', 'firstName lastName profileImage')
    .populate('project', 'title');
  return reviews;
};

// ===================== UPDATE REVIEW (FIXED) =====================
const updateReview = async (
  userId: string,
  reviewId: string,
  newRating: number,
  newReviewText: string,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');

  const reviewToUpdate = await Review.findById(reviewId);
  if (!reviewToUpdate) throw new AppError(404, 'Review not found');

  if (reviewToUpdate.client.toString() !== userId) {
    throw new AppError(403, 'Only the review owner can update');
  }

  const oldRating = reviewToUpdate.rating;
  const engineerId = reviewToUpdate.engineer;

  // Update the review fields
  reviewToUpdate.rating = newRating;
  reviewToUpdate.review = newReviewText;
  await reviewToUpdate.save();

  // Update engineer stats properly
  const engineer = await User.findById(engineerId);
  if (engineer) {
    engineer.totalRating = (engineer.totalRating || 0) - oldRating + newRating;
    engineer.avgRating =
      (engineer.ratingCount || 0) > 0
        ? engineer.totalRating / (engineer.ratingCount || 0)
        : 0;
    await engineer.save();
  }

  return reviewToUpdate;
};

// ===================== DELETE REVIEW (NEW) =====================
const deleteReview = async (userId: string, reviewId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');

  const review = await Review.findById(reviewId);
  if (!review) throw new AppError(404, 'Review not found');

  if (review.client.toString() !== userId) {
    throw new AppError(403, 'Only the review owner can delete');
  }

  const engineerId = review.engineer;
  const rating = review.rating;

  await review.deleteOne();

  // Update engineer stats after deletion
  const engineer = await User.findById(engineerId);
  if (engineer && (engineer.ratingCount || 0) > 0) {
    engineer.totalRating = (engineer.totalRating || 0) - rating;
    engineer.ratingCount = (engineer.ratingCount || 0) - 1;
    engineer.avgRating =
      engineer.ratingCount > 0
        ? engineer.totalRating / engineer.ratingCount
        : 0;
    await engineer.save();
  }

  return { message: 'Review deleted successfully' };
};

export const reviewService = {
  addReview,
  getEngineerReviews,
  updateReview,
  deleteReview,
};
