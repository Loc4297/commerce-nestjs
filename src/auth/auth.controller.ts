import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { AuthenticationService } from './auth.service';
import { LogInDTO } from './dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @ApiBody({
    type: RegisterDTO,
    examples: {
      user_1: {
        value: {
          name: 'John',
          email: 'johndoe@example.com',
          password: '1232@asdS',
        } as RegisterDTO,
      },
    },
  })
  async register(@Body() registrationData: RegisterDTO) {
    return this.authenticationService.register(registrationData);
  }

  @Post('log-in')
  @ApiBody({
    type: LogInDTO,
    examples: {
      admin: {
        value: {
          email: 'loc123.txbkhn@gmail.com',
          password: 'kemnhangheo',
        } as LogInDTO,
      },
      user: {
        value: {
          email: 'loc.txbkhn@gmail.com',
          password: 'kemnhangheo',
        } as LogInDTO,
      },
    },
  })
  async logIn(@Body() logInData: LogInDTO) {
    return this.authenticationService.login(logInData);
  }
}
