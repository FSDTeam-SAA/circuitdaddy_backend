import mongoose from 'mongoose';
import { IService } from './service.interface';

const serviceSchema = new mongoose.Schema<IService>(
  {
    serviceName: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Service = mongoose.model<IService>('Service', serviceSchema);
export default Service;
