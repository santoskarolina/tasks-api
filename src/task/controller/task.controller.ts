import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { TaskService } from '../services/task.service';
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { UserDto } from "../../user/dto/user.dto";
import { TaskDto } from "../dto/create-task.dto";

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  findOne(@Request() user, @Param('id') id:number){
    return this.taskService.findOne(user.user, id)
  }

  @Post()
  create(@Request() user, @Body() task: TaskDto){
    return this.taskService.create(user.user, task)
  }

  @Put(':id')
  finishTask(@Param('id') id: number){
    return this.taskService.finishTask(id)
  }
}
