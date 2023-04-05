import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findEmail(email);
    const userWithPass = await this.userService.findById(user.id);
    if (!userWithPass) {
      throw new NotFoundException('User not found');
    }
    const hashByPass = await bcrypt.compare(pass, userWithPass.password);
    if (!hashByPass) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    const payload = { username: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return {
      user,
      access_token: token,
    };
  }
}
