import { ICreateUserDto } from '../dto/create-user.dto';
import { User } from '../infra/typeorm/entities/user.entity';

export default interface IUserRepository {
  create(data: ICreateUserDto): Promise<User>;
  show(): Promise<User[]>;
  findById(user_id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
