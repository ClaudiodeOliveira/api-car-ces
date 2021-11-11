import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: String;
  @IsNotEmpty()
  @IsString()
  readonly password: String;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: String;
  @IsNotEmpty()
  @IsString()
  readonly role: String;
}
