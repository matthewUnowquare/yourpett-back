import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schema/user.schema';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userSchema }])],
})
export class UsersModule {}
