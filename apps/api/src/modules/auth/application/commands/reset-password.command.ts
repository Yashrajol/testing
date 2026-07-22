export class ResetPasswordCommand {
  constructor(
    public readonly target: string,
    public readonly otpCode: string,
    public readonly newPassword: string,
  ) {}
}
