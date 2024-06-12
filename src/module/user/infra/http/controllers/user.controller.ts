import { ICreateUserDto } from 'src/module/user/dto/create-user.dto';
import { CreateUserUseCase } from 'src/module/user/use-cases/create-user';

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
