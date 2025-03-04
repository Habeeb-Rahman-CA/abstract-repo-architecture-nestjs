// src/auth/auth.service.ts
import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  } from "@nestjs/common";
  import { JwtService } from "@nestjs/jwt";
  import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/createuser.dto";
import { UserRepositoryInterface } from "src/database/repositories/interfaces/user.repository.interface";
import { GetUserDto } from "./dto/getuser.dto";
import { UserRoleRepositoryInterface } from "src/database/repositories/interfaces/userrole.repository.interface";
import { RoleRepositoryInterface } from "src/database/repositories/interfaces/role.repository.interface";
  
  @Injectable()
  export class UserService {
    constructor(
      @Inject("UserRepositoryInterface")
      private userRepository: UserRepositoryInterface,
      @Inject("UserRoleRepositoryInterface")
      private userRoleRepository: UserRoleRepositoryInterface,
    ) {}
  
    async createUser(
      {
        email,
        password,
        name,status,department_id,vendor_id,role_id
      }: CreateUserDto,
      request
    ): Promise<any> {
        try{
        const checkEmailExist =
          await this.userRepository.emailExist(email);
        if (checkEmailExist)
          throw new BadRequestException("Email should be unique");
    
        const saltRounds = 10; // Define how many rounds of salt you want
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userData = {
          name: name,
          email: email,
          password: hashedPassword,
          is_active:status,
          department_id,vendor_id,
          created_by:request.user.user_id
        };
        let saveUser = await this.userRepository.createUserData(userData);
        if (saveUser.id) 
          {
            const roleData ={
              role_id:role_id,
              user_id:saveUser.id
            }
            console.log(roleData)
            const saveUserRole = await this.userRoleRepository.createUserData(roleData);
            return saveUser;
          }
        else throw new InternalServerErrorException("Error during save user data");
      }
      catch(error)
      {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Internal server error');
      }
    }
    async getUser({ limit, page, search, user_id,user_type_id,department_id,vendor_id }: GetUserDto) {
      try {
        const queryBuilder = {};
        return await this.userRepository.getUsers(
          queryBuilder,
          limit,
          page,
          search,
          user_type_id,
          department_id,vendor_id
        );
      } catch (error) {
        console.log(error);
      }
    }
    async getUserById(id: any) {
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    }
    async getDashboard(request)
    {
      try {
        const user = await this.userRepository.getUserById(request.user.user_id);
        if (!user) {
          throw new NotFoundException(`User not found`);
        }
        return user;
      } catch (error) {
        console.log(error);
      }
    }
  }
  