import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../task/entity/task.entity";

@Entity({ name: 'user', schema: 'tasks' })
export class User {

  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({type:'varchar', nullable:false, length: 255})
  user_name:string

  @Column({type:'varchar', nullable:false, length: 255})
  email:string

  @Column({type:'varchar', nullable:false, length: 255})
  password:string

  @Column({type:'varchar', nullable:true, length: 255})
  avatar:string

  @OneToMany(type => Task, task => task.user)
  tasks: Task[]

}
