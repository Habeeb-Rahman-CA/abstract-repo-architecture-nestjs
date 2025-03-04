import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserRoleRepository } from 'src/database/repositories/userrole.repository';
import { RoleRepository } from 'src/database/repositories/role.repository';

@Module({
  imports: [
    ConfigModule, // ✅ Load config module
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION', '1d'), // Access Token Expiry
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'UserRoleRepositoryInterface',
      useClass: UserRoleRepository,
    },
    {
      provide: 'RoleRepositoryInterface',
      useClass: RoleRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
