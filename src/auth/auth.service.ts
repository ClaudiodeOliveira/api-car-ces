import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/users/interface/user.interface';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import console from 'console';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private logger = new Logger(AuthService.name);

  async validateUser(email: String, pass: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    this.logger.log(user);
    if (user && bcrypt.compareSync(pass, user.password.valueOf())) {
      const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
