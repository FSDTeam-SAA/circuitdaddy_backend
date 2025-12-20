import mongoose, { Schema } from 'mongoose';

export interface IApprovedEngineer {
  engineer: mongoose.Types.ObjectId;
  hour: number;
  rate: number;
  projectFee?: number;
  originalProjectFee?: number;
  scaledProjectFee?: number;
  scalingFactor?: number;
}

export interface ITransfer {
  engineer?: mongoose.Types.ObjectId | null;
  amount: number;
  transferId: string;
  type?: 'platform_fee' | 'admin_fee' | 'engineer_payment';
  hours?: number;
  rate?: number;
  originalFee?: number;
  scaledFee?: number;
  scalingFactor?: number;
  timestamp?: Date;
  description?: string;
}

export interface IPayment {
  projectId: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  transferGroup?: string;
  amount: number; // totalPaid
  platformFee: number; // totalPaid এর 10% (Platform fee)
  adminFee: number; // approvedEngineersTotalAmount এর 10% (Admin পাবে)
  engineerPool: number; // approvedEngineersTotalAmount এর 90% (ইঞ্জিনিয়াররা পাবে)
  engineerFee: number; // engineerPool এর সমান
  totalEngineerCost: number; // ইঞ্জিনিয়ারদের মোট মূল্য (rate × hours)
  scalingFactor: number; // স্কেলিং ফ্যাক্টর
  totalAllocatedHours: number; // মোট allocated hours
  approvedEngineers: IApprovedEngineer[];
  transfers?: ITransfer[];
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'distributed';
  createdAt?: Date;
  updatedAt?: Date;
}

const ApprovedEngineerSchema = new Schema<IApprovedEngineer>(
  {
    engineer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hour: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    projectFee: { type: Number, default: 0 },
    originalProjectFee: { type: Number, default: 0 },
    scaledProjectFee: { type: Number, default: 0 },
    scalingFactor: { type: Number, default: 1 },
  },
  { _id: false },
);

const TransferSchema = new Schema<ITransfer>(
  {
    engineer: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: false,
      default: null 
    },
    amount: { type: Number, required: true },
    transferId: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['platform_fee', 'admin_fee', 'engineer_payment'],
      default: 'engineer_payment'
    },
    hours: { type: Number },
    rate: { type: Number },
    originalFee: { type: Number },
    scaledFee: { type: Number },
    scalingFactor: { type: Number },
    timestamp: { type: Date, default: Date.now },
    description: { type: String }
  },
  { _id: false },
);

const PaymentSchema = new Schema<IPayment>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stripeSessionId: { type: String, unique: true, sparse: true },
    stripePaymentIntentId: { type: String },
    transferGroup: { type: String, unique: true, sparse: true },
    amount: { type: Number, required: true },
    platformFee: { type: Number, default: 0 }, // ✅ totalPaid এর 10%
    adminFee: { type: Number, default: 0 }, // ✅ approvedEngineersTotalAmount এর 10%
    engineerPool: { type: Number, default: 0 }, // ✅ approvedEngineersTotalAmount এর 90%
    engineerFee: { type: Number, default: 0 },
    totalEngineerCost: { type: Number, default: 0 },
    scalingFactor: { type: Number, default: 1 },
    totalAllocatedHours: { type: Number, default: 0 },
    approvedEngineers: { type: [ApprovedEngineerSchema], default: [] },
    transfers: { type: [TransferSchema], default: [] },
    currency: { type: String, default: 'usd' },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'distributed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

// Indexes
PaymentSchema.index({ clientId: 1, createdAt: -1 });
PaymentSchema.index({ 'approvedEngineers.engineer': 1 });
PaymentSchema.index({ stripeSessionId: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ projectId: 1 });

export default mongoose.model<IPayment>('Payment', PaymentSchema);