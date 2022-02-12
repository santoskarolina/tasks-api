import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";


@Entity({name: 'task', schema:'tasks'})
export class Task{

  @PrimaryGeneratedColumn()
  task_id:number

  @Column({type: 'varchar', nullable:false, length: 255})
  name: string

  @Column({type: 'varchar', nullable:false, length: 255})
  description: string

  @Column({type: 'date', nullable:true })
  completion_date: Date

  @Column({type: 'date', nullable:true})
  opening: Date

  @Column()
  completed: Boolean

  @ManyToOne(type => User, user => user.tasks)
  @JoinColumn({name:'user_id'})
  user: User
}
