import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':username')
  async getUserByUsername(@Res() res, @Param('username') username) {
    const project = await this.usersService.findByUsername({ username });
    if (!project) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(project);
  }
}
