import { ICreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateUserUseCase } from 'src/user/use-cases/create-user';

import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  create(@Body() createUserDto: ICreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return [];
  }
}
