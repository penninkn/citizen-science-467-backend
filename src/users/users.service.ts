import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './create-user.dto';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './update-user.dto';

export interface RegistrationStatus {
  success: boolean;
  message: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const { email, username } = createUserDto;
    const [emailInDatabase, usernameTaken] = await Promise.all([
      this.findByEmail({ email }),
      this.findByUsername({ username }),
    ]);

    if (emailInDatabase) {
      throw new HttpException(
        'A user with this email already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (usernameTaken) {
      throw new HttpException(
        'Username is not available. Please try again!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findByLogin(username, password): Promise<UserDto> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const userDto: UserDto = {
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      admin: user.admin,
    };
    return userDto;
  }

  async findByEmail({ email }: any): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async updateUser(userId, userDto: UpdateUserDto): Promise<any> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Registration successful!',
    };
    const { email, username } = userDto;
    const [emailInDatabase, usernameTaken] = await Promise.all([
      this.findByEmail({ email }),
      this.findByUsername({ username }),
    ]);

    if (emailInDatabase?._id && emailInDatabase?._id != userId) {
      status = {
        success: false,
        message: 'Sorry! This email address is already in use...',
      };
      return status;
    }

    if (usernameTaken?._id && usernameTaken?._id != userId) {
      status = {
        success: false,
        message: 'Sorry! This username is already taken!',
      };
      return status;
    }

    await this.userModel.findByIdAndUpdate(userId, userDto, { new: true });
    return status;
  }

  async findByUsername({ username }: any): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    return {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      email: user.email,
      admin: user.admin,
      _id: user._id,
    };
  }
}
