import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/user.module';
import { AuthenticationService } from './auth.service';
import { AuthenticationController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserService } from 'src/users/user.service';

@Module({
  imports: [UserModule, PassportModule, ConfigModule, JwtModule.register({})],
  providers: [AuthenticationService, JwtStrategy, UserService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
