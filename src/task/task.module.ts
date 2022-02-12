import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskController } from './controller/task.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entity/task.entity";
import { UserModule } from "../user/user.module";

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    TypeOrmModule.forFeature([Task]), UserModule
  ]
})
export class TaskModule {}
