import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';
import { IService } from './service.interface';
import Service from './service.model';

const createService = async (payload: IService) => {
  const service = await Service.findOne({ serviceName: payload.serviceName });
  if (service) throw new AppError(400, 'Service already exists');

  const result = await Service.create(payload);
  return result;
};

const getAllServices = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = [
    'serviceName',
    'category',
    'description',
    'status',
  ];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Service.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any)

  const total = await Service.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};



export const serviceServices = {
  createService,
  getAllServices,
};
