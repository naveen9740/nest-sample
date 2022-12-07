import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // login(@Body() dto: AuthDto);
  // or use pipes
  // @  ('name', ParseIntPipe) name: string,
  // @Body('password') password: string,

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @ApiTags('Json To Xml')
  @Post('json-xml')
  jsonToxml(@Body() data: Map<string, any>) {
    return this.authService.jsonToxml(data);
  }

  @ApiTags('Xml To Json')
  @ApiConsumes('application/xml')
  @Post('xml-json')
  respond(@Body() data: Map<string, any>) {
    return this.authService.xmlToJson(data);
  }
}
