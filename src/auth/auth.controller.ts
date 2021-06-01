import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/create-user.dto';
import { LoginUserDto } from 'src/users/login-user.dto';
import { UpdateUserDto } from 'src/users/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService, RegistrationStatus } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDTO,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Put('register/:id')
  public async editProfile(
    @Param('id') userId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.authService.updateUser(userId, updateUserDto);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }
}
