import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserRoleRepository } from 'src/database/repositories/userrole.repository';
import { RoleRepository } from 'src/database/repositories/role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Ensure entities are imported properly
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'UserRoleRepositoryInterface',
      useClass: UserRoleRepository,
    }
  ],
})
export class UserModule {}
