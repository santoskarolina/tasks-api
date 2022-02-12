import { User } from "../../user/entity/user.entity";

export class TaskDto{
  name: string
  description: string
  completion_date: Date
  opening: Date
  user: User
  completed: Boolean
}
