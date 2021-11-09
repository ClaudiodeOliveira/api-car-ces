import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../interface/user.interface';

export class UserDto {
  constructor(data: User) {
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
  }

  @IsNotEmpty()
  readonly username: String;
  @IsNotEmpty()
  readonly password: String;
  @IsNotEmpty()
  @IsEmail()
  readonly email: String;
}
