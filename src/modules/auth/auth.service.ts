import { Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserRepositoryInterface } from 'src/database/repositories/interfaces/user.repository.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';
import * as crypto from 'crypto';
import { ChangePasswordDto } from './dto/resetpassword.dto';
import { UserRoleRepositoryInterface } from 'src/database/repositories/interfaces/userrole.repository.interface';
import { RoleRepositoryInterface } from 'src/database/repositories/interfaces/role.repository.interface';
@Injectable()
export class AuthService {
  constructor(
    @Inject("UserRepositoryInterface")
    private userRepository: UserRepositoryInterface,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject("UserRoleRepositoryInterface")
    private userRoleRepository: UserRoleRepositoryInterface,
    @Inject("RoleRepositoryInterface")
    private roleRepository: RoleRepositoryInterface,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
        throw new UnauthorizedException('Invalid credentials'); // User not found
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { user_id: user.id};
      const access_token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION', '1d'),
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d'),
    });
    const getRole = await this.userRoleRepository.getUserById(user.id)
    const roleDatam = getRole?await this.roleRepository.getRoleById(getRole.role_id):null
    user = {
      ...user,
      role: roleDatam || {}
    };         
    return {
      user,
      access_token,
      refresh_token
    };
  }
  async refreshToken(refreshToken)
  {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const newAccessToken = this.jwtService.sign(
        { username: payload.username, sub: payload.sub },
        {
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_EXPIRATION',
            '1d',
          ),
        },
      );

      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
  async forgotPassword({ email }: ForgotPasswordDto) {
    try {
      let user: any;
      if (email) user = await this.userRepository.findOneByEmail(email);
      if (!user ||user.length < 1)
        throw new NotFoundException('User not found');

       // Generate a random new password
      const newPassword = crypto.randomBytes(6).toString('hex'); // Generates a 12-character password

      // Hash the new password and save it to the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const userUpdate = await this.userRepository.updatePassword(
        user.id,
        hashedPassword
      );
      // Send the new password to the user's email
      // await this.mailerService.sendMail({
      //   to: email,
      //   subject: 'Your New Password',
      //   template: './new-password', // Use a template file (e.g., new-password.hbs)
      //   context: { name: user.name, newPassword },
      // });

      return { message: 'A new password has been sent to your email.',newPassword };
      } catch (error) {
        console.error("Error while forgot password send otp:", error);
        throw error;
      }
  }
  async changePassword(
    { current_password, new_password }: ChangePasswordDto,request
  ) {
    try {
      const user_id=request.user.user_id
      const verifyuser = await this.userRepository.verifyPassword(user_id);
      if (!verifyuser)
        throw new NotFoundException('User not found');
      if (
        !(await bcrypt.compare(
          current_password.toString(),
          verifyuser.password
        ))
      ) {
        throw new NotFoundException('Please enter correct password')
      }

      if (current_password === new_password) {
        throw new InternalServerErrorException('Please try a new password');
      }

      const hashedPassword = await bcrypt.hash(new_password.toString(), 10);

      const userUpdate = await this.userRepository.updatePassword(
        user_id,
        hashedPassword
      );

      return {
        userId: user_id, // Include any relevant user data if necessary
      };
    } catch (error) {
      throw error;
    }
  }
}
