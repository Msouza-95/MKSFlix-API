import { ICreateUserDto } from 'src/module/user/dto/create-user.dto';
import { CreateUserUseCase } from 'src/module/user/use-cases/create-user';
import { ShowUserUseCase } from 'src/module/user/use-cases/show-user';

import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly showUserUseCase: ShowUserUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: ICreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.showUserUseCase.execute();
  }
}
