import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';
import { ChangePasswordDto } from './dto/resetpassword.dto';
import { JwtAuthGuard } from 'src/guards/authguard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto,@Req() request: Request) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }
  @Post('refresh-token')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }
  @Post("forgot-password")
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Req() request: Request
  ) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post("reset-password")
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() request: Request
  ) {
    return this.authService.changePassword(changePasswordDto,request);
  }
}
