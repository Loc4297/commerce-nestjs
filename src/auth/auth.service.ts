import { UserService } from 'src/users/user.service';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
// import PostgresErrorCode from 'src/database/postgresErrorCode.enum';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';
import { LogInDTO } from './dto/login.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  public async register(registrationData: RegisterDTO) {
    const hashedPassword = await argon.hash(registrationData.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          name: registrationData.name,
          email: registrationData.email,
          password: hashedPassword,
          isAdmin: registrationData.isAdmin,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      // throw new ForbiddenException('User with this email already exists');
      return error;
    }
  }

  public async login(logInData: LogInDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: logInData.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const passwordMatched = await argon.verify(
      user.password,
      logInData.password,
    );
    if (!passwordMatched) {
      throw new ForbiddenException('Incorrect password');
    }
    return await this.signJwtToken(user.id, user.email);
  }
  // (...)
  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
    };
  }
}
