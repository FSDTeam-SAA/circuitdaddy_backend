/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';

export enum UserRole {
  CLIENT = 'client',
  ENGINEER = 'engineer',
  ADMIN = 'admin',
}

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  REJECTED = 'rejected',
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CLIENT,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING,
    },

    // Profile
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    profileImage: String,

    // Engineer Specific
    title: String,
    bio: String,
    hourlyRate: Number,
    experience: Number,
    skills: [String],
    certifications: [String],
    portfolio: [String],

    // Client Specific
    companyName: String,
    industry: String,

    // Location
    address: String,
    city: String,
    country: String,
    isEmailVerified: { type: Boolean },
    // OTP
    otp: String,
    otpExpires: Date,

    lastLogin: Date,
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds),
  );
  next();
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
