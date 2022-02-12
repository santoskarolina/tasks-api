import { Controller, Get, UseGuards, Request, Post, Body } from "@nestjs/common";
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { UserDto } from "../dto/user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('infos')
  findOne(@Request() user){
    return this.userService.findOne(user.user)
  }

  @Post()
  create(@Body() user: UserDto){
    return this.userService.create(user)
  }

  @Get('/tasks/tasks')
  show(){
    return 'ola'
  }
}
