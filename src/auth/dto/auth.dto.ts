import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  password: string;
}
