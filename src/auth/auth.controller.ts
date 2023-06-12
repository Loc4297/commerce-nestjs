import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { AuthenticationService } from './auth.service';
import { LogInDTO } from './dto/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDTO) {
    return this.authenticationService.register(registrationData);
  }

  @Post('log-in')
  async logIn(@Body() logInData: LogInDTO) {
    return this.authenticationService.login(logInData);
  }
}
