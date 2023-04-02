import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create_user.dto';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor( @Inject(forwardRef(() => UserService)) private userService: UserService,
                private jwtService: JwtService) { }

    async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Некорректный емайл или пароль' })
    }
}