import { IsEmail, IsEnum, IsOptional, IsString, Length, MinLength } from 'class-validator';
import { RoleName as Role } from '@prisma/client';

// Messages are written for the person filling in the form: class-validator's
// defaults ("password must be longer than or equal to 8 characters") get shown
// verbatim in the UI.

export class RegisterDto {
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email!: string;

  @IsString({ message: 'Please enter a password.' })
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  password!: string;

  @IsString({ message: 'Please enter your name.' })
  @MinLength(1, { message: 'Please enter your name.' })
  name!: string;

  @IsOptional()
  @IsEnum(Role, { message: 'That account type is not valid.' })
  role?: Role;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email!: string;

  @IsString({ message: 'Please enter your password.' })
  @MinLength(1, { message: 'Please enter your password.' })
  password!: string;
}

export class VerifyOtpDto {
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email!: string;

  @IsString({ message: 'Please enter the 6-digit verification code.' })
  @Length(6, 6, { message: 'The verification code must be exactly 6 digits.' })
  otp!: string;
}
