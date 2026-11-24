import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { drizzle } from 'drizzle-orm/postgres-js'
import { DRIZZLE } from '../../database/database.provider.js'
import { type DrizzleDB} from '../../database/database.type.js'
import * as schema from '../../database/schema/schema.js'
import { and, eq } from 'drizzle-orm';

@Injectable()
export class UsersService {

  constructor(@Inject(DRIZZLE) private readonly db:DrizzleDB ){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const [user] = await this.db
    .select({
      email: schema.users.email,
      role: schema.roles.id
    })
    .from(schema.users)
    .innerJoin(schema.roles, eq(schema.users.roleID, schema.roles.id))
    .where(
      and(eq(schema.users.id, id))
    );

    if(!user){
      throw new NotFoundException(`User ${id} not found`)
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
