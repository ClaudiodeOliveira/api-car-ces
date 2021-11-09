import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: String;
  @IsNotEmpty()
  readonly password: String;
  @IsNotEmpty()
  @IsEmail()
  readonly email: String;
}
