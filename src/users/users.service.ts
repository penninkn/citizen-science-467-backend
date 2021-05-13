import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './create-user.dto';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';

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
        'A user with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (usernameTaken) {
      throw new HttpException(
        'Username is not available. Please choose again',
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

    const areEqual = user.password === password ? true : false;
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

  async findByEmail({ email }: any): Promise<boolean> {
    const found = await this.userModel.findOne({ email }).exec();
    if (found) {
      return true;
    }

    return false;
  }

  async findByUsername({ username }: any): Promise<UserDto> {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async addUserObservation(observationId, userId): Promise<void> {
    await this.userModel.findById(userId).updateOne({
      $push: {
        observations: observationId,
      },
    });
  }
}
