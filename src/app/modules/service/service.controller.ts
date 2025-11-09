import pick from '../../helper/pick';
import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { serviceServices } from './service.service';

const createService = catchAsync(async (req, res) => {
  const result = await serviceServices.createService(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'category']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await serviceServices.getAllServices(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  });
});


export const serviceController = {
  createService,
  getAllServices,
};
