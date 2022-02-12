import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { TaskService } from '../services/task.service';
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { TaskDto } from "../dto/create-task.dto";

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('open')
  findOpne(@Request() user){
    return this.taskService.findOpen(user.user)
  }

  @Get('close')
  findClose(@Request() user){
    return this.taskService.findClose(user.user)
  }

  @Get(':id')
  findOne(@Request() user, @Param('id') id:number){
    return this.taskService.findOne(user.user, id)
  }

  @Delete(':id')
  delete(@Request() user, @Param('id') id:number){
    return this.taskService.delete(user.user, id)
  }

  @Post()
  create(@Request() user, @Body() task: TaskDto){
    return this.taskService.create(user.user, task)
  }

  @Put('finish/:id')
  finishTask(@Param('id') id: number){
    return this.taskService.finishTask(id)
  }
}
