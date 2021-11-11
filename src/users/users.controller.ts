import {
  Body,
  Controller,
  Logger,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './services/users.service';

@Controller('create/user')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    this.logger.log(`Start - UsersController.createUser - ${JSON.stringify(createUserDto)}`);
    return await this.usersService.createUser(createUserDto);
  }
}
