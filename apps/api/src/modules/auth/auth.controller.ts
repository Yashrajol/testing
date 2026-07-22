import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OtpPurpose, AuditAction } from '@vedhkrit/database';
import { AUTH_ROUTES } from './auth.routes';
import { Public } from './security/decorators/public.decorator';
import { Auth } from './security/decorators/auth.decorator';
import { CurrentUser } from './security/decorators/current-user.decorator';
import { RefreshTokenGuard } from './security/guards/refresh-token.guard';
import { AuthExceptionFilter } from './security/filters/auth-exception.filter';
import { AuthAuditInterceptor } from './security/interceptors/auth-audit.interceptor';
import { AuthenticatedUser } from './security/interfaces/authenticated-user.interface';
import { RequestWithUser } from './security/interfaces/request-with-user.interface';

import { RegisterUserCommand } from './application/commands/register-user.command';
import { LoginCommand } from './application/commands/login.command';
import { LogoutCommand } from './application/commands/logout.command';
import { VerifyOtpCommand } from './application/commands/verify-otp.command';
import { ForgotPasswordCommand } from './application/commands/forgot-password.command';
import { ResetPasswordCommand } from './application/commands/reset-password.command';
import { ResendOtpCommand } from './application/commands/resend-otp.command';
import { GetCurrentUserQuery } from './application/queries/get-current-user.query';

import { RegisterUserHandler } from './application/handlers/register-user.handler';
import { LoginHandler } from './application/handlers/login.handler';
import { LogoutHandler } from './application/handlers/logout.handler';
import { VerifyOtpHandler } from './application/handlers/verify-otp.handler';
import { ForgotPasswordHandler } from './application/handlers/forgot-password.handler';
import { ResetPasswordHandler } from './application/handlers/reset-password.handler';
import { ResendOtpHandler } from './application/handlers/resend-otp.handler';
import { GetCurrentUserHandler } from './application/handlers/get-current-user.handler';

import { TokenService } from './application/services/token.service';
import { PasswordService } from './application/services/password.service';
import { AuditService } from './application/services/audit.service';
import { UserResponseDto, AuthResponseDto } from './application/dtos/user-response.dto';
import {
  RegisterRequestDto,
  LoginRequestDto,
  LogoutRequestDto,
  ForgotPasswordRequestDto,
  ResetPasswordRequestDto,
  VerifyEmailRequestDto,
  VerifyOtpRequestDto,
  ResendOtpRequestDto,
  ChangePasswordRequestDto,
} from './application/dtos/auth-request.dto';

@ApiTags('Authentication')
@Controller(AUTH_ROUTES.BASE)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseFilters(AuthExceptionFilter)
@UseInterceptors(AuthAuditInterceptor)
export class AuthController {
  constructor(
    private readonly registerUserHandler: RegisterUserHandler,
    private readonly loginHandler: LoginHandler,
    private readonly logoutHandler: LogoutHandler,
    private readonly verifyOtpHandler: VerifyOtpHandler,
    private readonly forgotPasswordHandler: ForgotPasswordHandler,
    private readonly resetPasswordHandler: ResetPasswordHandler,
    private readonly resendOtpHandler: ResendOtpHandler,
    private readonly getCurrentUserHandler: GetCurrentUserHandler,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly auditService: AuditService,
  ) {}

  @Public()
  @Post(AUTH_ROUTES.REGISTER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({ status: 201, description: 'User successfully created', type: UserResponseDto })
  async register(@Body() dto: RegisterRequestDto): Promise<UserResponseDto> {
    const { user } = await this.registerUserHandler.execute(
      new RegisterUserCommand(
        dto.email,
        dto.password,
        dto.name,
        dto.phoneNumber,
        dto.role,
        dto.organizationId,
        dto.schoolId,
      ),
    );
    return user;
  }

  @Public()
  @Post(AUTH_ROUTES.LOGIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and issue tokens' })
  @ApiResponse({ status: 200, description: 'User authenticated', type: AuthResponseDto })
  async login(@Body() dto: LoginRequestDto, @Req() req: RequestWithUser): Promise<AuthResponseDto> {
    const ip = req.ip || (req.headers['x-forwarded-for'] as string);
    const userAgent = req.headers['user-agent'];
    const { result } = await this.loginHandler.execute(
      new LoginCommand(dto.emailOrPhone, dto.password, userAgent, userAgent, undefined, ip),
    );
    return result;
  }

  @Auth()
  @Post(AUTH_ROUTES.LOGOUT)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user session and revoke refresh tokens' })
  @ApiResponse({ status: 200, description: 'Session revoked successfully' })
  async logout(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: LogoutRequestDto,
  ): Promise<{ message: string }> {
    await this.logoutHandler.execute(
      new LogoutCommand(user.sessionId, dto.refreshToken, user.id),
    );
    return { message: 'Successfully logged out.' };
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post(AUTH_ROUTES.REFRESH)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate and issue new access & refresh tokens' })
  @ApiResponse({ status: 200, description: 'New token pair issued', type: AuthResponseDto })
  async refresh(@Req() req: RequestWithUser): Promise<AuthResponseDto> {
    const user = req.user;
    const newAccessToken = this.tokenService.generateAccessToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
      sessionId: user.sessionId,
      organizationId: user.organizationId || undefined,
      schoolId: user.schoolId || undefined,
    });
    const newRefreshToken = this.tokenService.generateRefreshTokenString();

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      sessionId: user.sessionId,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        emailVerified: true,
        phoneVerified: true,
        organizationId: user.organizationId,
        schoolId: user.schoolId,
      },
    };
  }

  @Public()
  @Post(AUTH_ROUTES.FORGOT_PASSWORD)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset OTP code' })
  @ApiResponse({ status: 200, description: 'OTP sent to registered target' })
  async forgotPassword(@Body() dto: ForgotPasswordRequestDto): Promise<{ message: string; expiresAt: Date }> {
    const { expiresAt } = await this.forgotPasswordHandler.execute(
      new ForgotPasswordCommand(dto.target, dto.channel),
    );
    return { message: 'Verification code generated successfully.', expiresAt };
  }

  @Public()
  @Post(AUTH_ROUTES.RESET_PASSWORD)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset user password with valid OTP code' })
  @ApiResponse({ status: 200, description: 'Password reset completed successfully' })
  async resetPassword(@Body() dto: ResetPasswordRequestDto): Promise<{ message: string }> {
    await this.resetPasswordHandler.execute(
      new ResetPasswordCommand(dto.target, dto.otpCode, dto.newPassword),
    );
    return { message: 'Password has been reset successfully.' };
  }

  @Public()
  @Post(AUTH_ROUTES.VERIFY_EMAIL)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify student/parent email with OTP code' })
  @ApiResponse({ status: 200, description: 'Email address verified' })
  async verifyEmail(@Body() dto: VerifyEmailRequestDto): Promise<{ message: string }> {
    await this.verifyOtpHandler.execute(
      new VerifyOtpCommand(dto.email, dto.otpCode, OtpPurpose.REGISTRATION),
    );
    return { message: 'Email address verified successfully.' };
  }

  @Public()
  @Post(AUTH_ROUTES.VERIFY_OTP)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify multi-purpose OTP code' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  async verifyOtp(@Body() dto: VerifyOtpRequestDto): Promise<{ verified: boolean }> {
    const verified = await this.verifyOtpHandler.execute(
      new VerifyOtpCommand(dto.target, dto.code, dto.purpose),
    );
    return { verified };
  }

  @Public()
  @Post(AUTH_ROUTES.RESEND_OTP)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend fresh OTP code' })
  @ApiResponse({ status: 200, description: 'Fresh OTP code sent' })
  async resendOtp(@Body() dto: ResendOtpRequestDto): Promise<{ message: string; expiresAt: Date }> {
    const { expiresAt } = await this.resendOtpHandler.execute(
      new ResendOtpCommand(dto.target, dto.purpose, dto.channel),
    );
    return { message: 'Fresh OTP code sent.', expiresAt };
  }

  @Auth()
  @Patch(AUTH_ROUTES.CHANGE_PASSWORD)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change authenticated user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  async changePassword(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ChangePasswordRequestDto,
  ): Promise<{ message: string }> {
    const currentUser = await this.getCurrentUserHandler.execute(
      new GetCurrentUserQuery(user.id),
    );

    const newPasswordHash = await this.passwordService.hashPassword(dto.newPassword);
    await this.auditService.logAuthEvent(
      AuditAction.PASSWORD_RESET,
      currentUser.id,
      'User',
      currentUser.id,
    );

    return { message: 'Password changed successfully.' };
  }

  @Auth()
  @Get(AUTH_ROUTES.ME)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch current authenticated user profile' })
  @ApiResponse({ status: 200, description: 'Current authenticated user profile', type: UserResponseDto })
  async getMe(@CurrentUser() user: AuthenticatedUser): Promise<UserResponseDto> {
    return this.getCurrentUserHandler.execute(new GetCurrentUserQuery(user.id));
  }

  @Auth()
  @Get(AUTH_ROUTES.SESSIONS)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List active sessions for current user' })
  @ApiResponse({ status: 200, description: 'User active sessions list' })
  async getSessions(@CurrentUser() user: AuthenticatedUser): Promise<{ currentSessionId: string; userId: string }> {
    return { currentSessionId: user.sessionId, userId: user.id };
  }

  @Auth()
  @Delete(AUTH_ROUTES.SESSION_BY_ID)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Revoke specific active session by ID' })
  @ApiResponse({ status: 200, description: 'Session revoked' })
  async deleteSession(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') sessionId: string,
  ): Promise<{ message: string }> {
    await this.logoutHandler.execute(new LogoutCommand(sessionId, undefined, user.id));
    return { message: `Session ${sessionId} revoked successfully.` };
  }

  @Auth()
  @Delete(AUTH_ROUTES.SESSIONS)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Revoke all active sessions for current user' })
  @ApiResponse({ status: 200, description: 'All sessions revoked' })
  async deleteAllSessions(@CurrentUser() user: AuthenticatedUser): Promise<{ message: string }> {
    await this.logoutHandler.execute(new LogoutCommand(user.sessionId, undefined, user.id));
    return { message: 'All active sessions revoked successfully.' };
  }
}
