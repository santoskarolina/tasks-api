import { Injectable } from '@nestjs/common';
import { UserService } from "../../user/services/user.service";
import * as crypto from 'crypto';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  user: any = {}

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(userEmail:string, userPassword:string): Promise<any>{
    this.user = await this.userService.findByEmail(userEmail)

    userPassword = crypto.createHmac('sha256', userPassword).digest('hex')

    if(this.user && this.user.password === userPassword){
      return this.user
    }
    return null

  }

  async login(user:any){
    const payload = {email: user.email, sub: user.id}
    return {
      access_token:  this.jwtService.sign(payload)
    }
  }

}
