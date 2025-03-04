// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Req, UseInterceptors, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createuser.dto';
import { UserService } from './user.service';
import { ResponseInterceptor } from 'src/common/helpers/transform.interceptor';
import { JwtAuthGuard } from 'src/guards/authguard';
import { GetUserDto } from './dto/getuser.dto';
import { GetUserByIdDto } from './dto/getuserbyid.dto';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('add-user')
  async addUser(@Body() addUserDto: CreateUserDto,@Req() request: Request
) {
    return this.userService.createUser(addUserDto,request);
}

  @ApiBearerAuth()
  @Get('get-user')
  async getUser(@Query() getUserDto: GetUserDto) {
    return this.userService.getUser(getUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('get-user-by-id')
  async getUserById(@Query() getUserByIdDto: GetUserByIdDto) {
    return this.userService.getUserById(getUserByIdDto.user_id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('get-dashboard')
  async getDashboard(@Req() request: Request) {
    return this.userService.getDashboard(request);
  }

}
