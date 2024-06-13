import { ICreateUserDto } from 'src/module/user/dto/create-user.dto';
import { CreateUserUseCase } from 'src/module/user/use-cases/create-user';
import { ShowUserUseCase } from 'src/module/user/use-cases/show-user';
import { ZodValidationPipe } from 'src/pipes/zod-validation.-pipe';
import { z } from 'zod';

import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';

const createUserbody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateUserbody = z.infer<typeof createUserbody>;

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly showUserUseCase: ShowUserUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserbody))
  create(@Body() createUser: CreateUserbody) {
    return this.createUserUseCase.execute(createUser);
  }

  @Get()
  findAll() {
    return this.showUserUseCase.execute();
  }
}
