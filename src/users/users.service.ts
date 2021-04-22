import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    const user = await this.userModel.findOne({
      where: { username },
    });
    return user;
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userModel.findOne({ username: username }).exec();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = user.password === password ? true : false;

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const userDto: UserDto = {
      username: user.username,
      email: user.email,
    };
    return userDto;
  }
}
