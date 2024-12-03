import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MongooseValidateObjectIdPipe } from 'src/common/pipes/MongooseValidateObjectIdPipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/:id')
  async getUserByEmail(
    @Param('id', new MongooseValidateObjectIdPipe()) email: string,
  ) {
    return this.userService.findUserByEmail(email);
  }
}
