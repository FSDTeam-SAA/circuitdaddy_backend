import mongoose from 'mongoose';

export interface IApprovedEngineer {
  engineer: mongoose.Types.ObjectId;
  hour: number;
  rate: number;
  projectFee?: number;
  originalProjectFee?: number;
  scaledProjectFee?: number;
  scalingFactor?: number;
  isManager?: boolean;
}

export interface ITransfer {
  engineer?: mongoose.Types.ObjectId | null;
  amount: number;
  transferId: string;
  type?: 'platform_fee' | 'manager_fee' | 'engineer_payment';
  hours?: number;
  rate?: number;
  originalFee?: number;
  scaledFee?: number;
  scalingFactor?: number;
  timestamp?: Date;
}

export interface IPayment {
  projectId: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  transferGroup?: string;
  amount: number;
  adminFee: number;
  managerFee: number;
  engineerPool: number;
  engineerFee: number;
  totalEngineerCost: number;
  scalingFactor: number;
  totalAllocatedHours: number;
  approvedEngineers: IApprovedEngineer[];
  transfers?: ITransfer[];
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'distributed';
  createdAt?: Date;
  updatedAt?: Date;
}