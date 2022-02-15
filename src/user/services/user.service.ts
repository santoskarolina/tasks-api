import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository, getConnection } from "typeorm";
import { UserDto } from "../dto/user.dto";
import * as crypto from 'crypto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    find(){
        return this.userRepository.find()
    }

    async findOne(user_online: any){
        const userFind = await this.findUserByEmail(user_online.email)
        const user = await this.userRepository.findOne(userFind.user_id)
        if(!user){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'User not found.'
            }, HttpStatus.BAD_REQUEST)
        }else{
            return user
        }
    }

    async create(new_user: UserDto) {
        const user_email = await this.userRepository.findOne({
            where: {
                email: new_user.email
            }
        })
        if (user_email) {
            throw new HttpException({
                message: 'Email already registered',
                status: HttpStatus.BAD_REQUEST,
                error: 'email'
            }, HttpStatus.BAD_REQUEST)
        } else {
            new_user.password = crypto.createHmac('sha256', new_user.password).digest('hex')
            return await this.userRepository.save(new_user)
        }
    }

    async update(id:number,  user: UserDto){
        const userFind = await this.userRepository.findOne(id)
        if(!userFind){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'User not found.'
            }, HttpStatus.BAD_REQUEST)
        }else{
            return await getConnection()
              .createQueryBuilder()
              .update(User)
              .set({
                  user_name: user.user_name
              })
              .where("user_id =: user_id",  {user_id: id})
              .execute()
        }
    }

    async findByEmail(email: string){
        return await  this.userRepository.findOne({
            where: {
                email: email
            }
        })
    }

    async findUserByEmail(email: string){
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })
        return user
    }


}
