import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/createUser.dto';
import { Role, User } from '../interface/user.interface';
import * as bcrypt from 'bcrypt';
import { Roles } from '../roles/roles.decorator';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(email: String): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const user = await this.userModel.findOne({ username }).exec();
    if (user)
      throw new BadRequestException(`O usuario ${username} já foi cadastrado`);

    const newUser = new this.userModel(createUserDto);
    newUser.password = await bcrypt.hash(password.valueOf(), 10);
    return newUser.save();
  }

  async findById(_id: String): Promise<User> {
    const user = await this.userModel.findOne({ _id: _id }).exec();
    if (!user) throw new BadRequestException(`User ${_id} não encontrado!`);
    return user;
  }

  // async findRoles(): Promise<Array<String>> {
  //   const roles = Role;
  //   return roles;
  // }
}
