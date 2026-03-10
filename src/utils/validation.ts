

import * as Yup from 'yup';

// Email validation regex pattern (standard email format)
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation regex pattern (at least 1 digit, 1 special char, 1 lowercase, 1 uppercase, min 8 chars)
export const passwordRegex =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// Name validation regex pattern (letters only, 3-20 chars)
export const nameRegex = /^[a-zA-Z]{3,20}$/;

// Yup validation schema for Login form
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      passwordRegex,
      'Password must contain (A-Z, a-z, 0-9, ~!@#$%^&*()_-+=)',
    )
    .required('Password is required'),
});

// Yup validation schema for Resetting Password
export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email is required'),
  newPassword: Yup.string()
    .matches(
      passwordRegex,
      'Password must contain (A-Z, a-z, 0-9, ~!@#$%^&*()_-+=) 8 characters',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
});

// Yup validation schema for Reset Password (email only)
export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email is required'),
});

// Yup validation schema for OTP verification
export const verifyOtpSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .length(6, 'OTP must be exactly 6 digits'),
});

// Yup validation schema for first and last name fields
export const nameValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'First name must be at least 3 characters')
    .max(20, 'First name must be at most 20 characters')
    .matches(nameRegex, 'First name can only contain letters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(3, 'Last name must be at least 3 characters')
    .max(20, 'Last name must be at most 20 characters')
    .matches(nameRegex, 'Last name can only contain letters')
    .required('Last name is required'),
});

// Phone: digits only, 8–15 chars (with country code)
export const phoneRegex = /^[0-9]{8,15}$/;

// Yup validation schema for Signup form
export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(30, 'First name must be at most 30 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(30, 'Last name must be at most 30 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters')
    .required('Last name is required'),
  email: Yup.string()
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegex, 'Please enter a valid phone number (8–15 digits)')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      passwordRegex,
      'Password must contain uppercase, lowercase, number and special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
});
