import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleName, OtpChannel, OtpPurpose } from '@vedhkrit/database';

export class RegisterRequestDto {
  @ApiProperty({ example: 'student@vedhkrit.com', description: 'User email address' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email!: string;

  @ApiProperty({ example: 'Password123!', description: 'Minimum 8 characters password' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password!: string;

  @ApiProperty({ example: 'Yash Rajole', description: 'Full name' })
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name!: string;

  @ApiPropertyOptional({ example: '+919876543210', description: 'Mobile phone number' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({ enum: RoleName, example: RoleName.STUDENT, description: 'Target user role' })
  @IsOptional()
  @IsEnum(RoleName)
  role?: RoleName;

  @ApiPropertyOptional({ example: 'org-uuid-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'school-uuid-456' })
  @IsOptional()
  @IsString()
  schoolId?: string;
}

export class LoginRequestDto {
  @ApiProperty({ example: 'student@vedhkrit.com', description: 'Email address or phone number' })
  @IsString()
  @IsNotEmpty({ message: 'Please enter your email or phone number.' })
  emailOrPhone!: string;

  @ApiProperty({ example: 'Password123!', description: 'Password' })
  @IsString()
  @IsNotEmpty({ message: 'Please enter your password.' })
  password!: string;
}

export class LogoutRequestDto {
  @ApiPropertyOptional({ description: 'Optional refresh token string to revoke' })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}

export class RefreshTokenRequestDto {
  @ApiProperty({ description: 'Refresh token string' })
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}

export class ForgotPasswordRequestDto {
  @ApiProperty({ example: 'user@vedhkrit.com', description: 'Target email address or phone number' })
  @IsString()
  @IsNotEmpty()
  target!: string;

  @ApiPropertyOptional({ enum: OtpChannel, default: OtpChannel.EMAIL })
  @IsOptional()
  @IsEnum(OtpChannel)
  channel?: OtpChannel;
}

export class ResetPasswordRequestDto {
  @ApiProperty({ example: 'user@vedhkrit.com' })
  @IsString()
  @IsNotEmpty()
  target!: string;

  @ApiProperty({ example: '123456', description: '6-digit OTP code' })
  @IsString()
  @Length(6, 6)
  otpCode!: string;

  @ApiProperty({ example: 'NewSecurePassword123!' })
  @IsString()
  @MinLength(8)
  newPassword!: string;
}

export class VerifyEmailRequestDto {
  @ApiProperty({ example: 'user@vedhkrit.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  otpCode!: string;
}

export class VerifyOtpRequestDto {
  @ApiProperty({ example: 'user@vedhkrit.com' })
  @IsString()
  @IsNotEmpty()
  target!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  code!: string;

  @ApiProperty({ enum: OtpPurpose, example: OtpPurpose.REGISTRATION })
  @IsEnum(OtpPurpose)
  purpose!: OtpPurpose;
}

export class ResendOtpRequestDto {
  @ApiProperty({ example: 'user@vedhkrit.com' })
  @IsString()
  @IsNotEmpty()
  target!: string;

  @ApiProperty({ enum: OtpPurpose, example: OtpPurpose.REGISTRATION })
  @IsEnum(OtpPurpose)
  purpose!: OtpPurpose;

  @ApiPropertyOptional({ enum: OtpChannel, default: OtpChannel.EMAIL })
  @IsOptional()
  @IsEnum(OtpChannel)
  channel?: OtpChannel;
}

export class ChangePasswordRequestDto {
  @ApiProperty({ example: 'OldPassword123!' })
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;

  @ApiProperty({ example: 'NewPassword123!' })
  @IsString()
  @MinLength(8)
  newPassword!: string;
}
