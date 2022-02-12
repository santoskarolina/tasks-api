import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { RequestWithUser } from "../dto/RequestWithUser";

@UseGuards(LocalAuthGuard)
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('auth/login')
    async login(@Body() user: RequestWithUser) {
      return await this.authService.login(user);
    }
}
