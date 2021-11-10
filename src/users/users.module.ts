import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './interface/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService, { provide: 'RolesGuard', useClass: RolesGuard }],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
