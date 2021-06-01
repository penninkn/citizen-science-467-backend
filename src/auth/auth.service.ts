import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/create-user.dto';
import { LoginUserDto } from 'src/users/login-user.dto';
import { UserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt.strategy';
import * as bcrypt from 'bcrypt';

export interface RegistrationStatus {
  success: boolean;
  message: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDTO): Promise<any> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Registration successful!',
    };
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      await this.userService.createUser(createUserDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByUsername(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    // find user in db
    console.log(await bcrypt.hash(loginUserDto.password, 10));
    const user = await this.userService.findByLogin(
      loginUserDto.username,
      loginUserDto.password,
    );

    // generate and sign token
    const token = this._createToken(user);

    return {
      username: user.username,
      ...token,
    };
  }

  private _createToken({ username }: UserDto): any {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: '6000s',
      accessToken,
    };
  }
}
