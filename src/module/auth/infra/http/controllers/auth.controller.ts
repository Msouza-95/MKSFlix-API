import { CreateauthenticateUseCase } from 'src/module/user/use-cases/create-authenticate';
import { ZodValidationPipe } from 'src/pipes/zod-validation.-pipe';
import { z } from 'zod';

import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  UsePipes,
} from '@nestjs/common';

const authenticateBody = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBody = z.infer<typeof authenticateBody>;

@Controller('/sessions')
export class AuthController {
  constructor(
    private readonly createauthenticateUseCase: CreateauthenticateUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBody))
  async create(@Body() body: AuthenticateBody) {
    const { email, password } = body;

    const token = await this.createauthenticateUseCase.execute({
      password,
      email,
    });

    return { access_token: token };
  }
}
