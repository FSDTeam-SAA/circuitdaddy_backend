import { Types } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  role: "client"|"engineer"|"admin";
  status: "pending"|"active"|"rejected"|"suspended";

  firstName: string;
  lastName: string;
  phone?: string;
  profileImage?: string;

  title?: string;
  bio?: string;
  hourlyRate?: number;
  experience?: number;
  skills?: string[];
  certifications?: string[];
  portfolio?: string[];
  companyName?: string;
  industry?: Types.ObjectId;
  service?: Types.ObjectId;

  address?: string;
  city?: string;
  country?: string;

  isEmailVerified: boolean;
  otp?: string;
  otpExpires?: Date;
  lastLogin?: Date;
}
