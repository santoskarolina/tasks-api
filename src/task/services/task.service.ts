import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entity/task.entity";
import { Repository, getConnection } from "typeorm";
import { UserService } from "../../user/services/user.service";
import { TaskDto } from "../dto/create-task.dto";

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private userService: UserService
  ) {}


  async create(user_online:any, task: TaskDto){
    const user = await this.userService.findUserByEmail(user_online.email)
    task.user = user
    task.opening = new Date()
    task.completed = false
    return this.taskRepository.save(task)
  }

  async findOpen(user_online:any): Promise<Task[]>{
    const user = await this.userService.findUserByEmail(user_online.email)
    return await this.taskRepository.find({
      where: {
        user: user,
        completed: false
      }
    })
  }

  async findClose(user_online:any): Promise<Task[]>{
    const user = await this.userService.findUserByEmail(user_online.email)
    return await this.taskRepository.find({
      where: {
        user: user,
        completed: true
      }
    })
  }

  async delete(user_online:any, id: number){
    const user = await this.userService.findUserByEmail(user_online.email)
    const task =  this.taskRepository.findOne(id, {
      where: {
        user: user
      }
    })
    return await this.taskRepository.delete(id)
  }

  async findOne(user_online:any, id: number){
    const user = await this.userService.findUserByEmail(user_online.email)
    const task =  this.taskRepository.findOne(id, {
      where: {
        user: user
      }
    })
    return task
  }

  async finishTask(id:number){
    const taks = await this.taskRepository.findOne(id)
    if(!taks) {
      throw  new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Task not found'
      }, HttpStatus.BAD_REQUEST)
    }
    return await getConnection()
      .createQueryBuilder()
      .update(Task)
      .set({
        completion_date: new Date(),
        completed: true
      })
      .where("task_id =:task_id", {task_id: id})
      .execute()
  }
}
