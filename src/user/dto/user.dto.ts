import { IsEmail, IsNotEmpty, Length } from "class-validator";


export class UserDto {

  @IsNotEmpty({message: 'Required field'})
  user_name:string

  @IsNotEmpty({message: 'Required field'})
  @IsEmail()
  email:string

  @IsNotEmpty({message: 'Required field'})
  password:string

  @IsNotEmpty({message: 'Required field'})
  avatar:string
}
