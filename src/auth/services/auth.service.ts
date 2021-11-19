import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/users/interface/user.interface';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private logger = new Logger(AuthService.name);

  async validateUser(email: String, pass: string): Promise<User> {
    this.logger.log(`Start - AuthService.validateUser - email - ${email}`);
    const user = await this.usersService.findOne(email);
    if (user && bcrypt.compareSync(pass, user.password.valueOf())) {
      const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      username: user.username,
      token: this.jwtService.sign(payload),
      _id: user._id,
      role: user.role,
    };
  }
}
