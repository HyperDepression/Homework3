import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create_user.dto';
import { AddRoleDto } from './dto/add_role.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RoleService,
        private authService: AuthService) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByName("USER")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        return await this.userRepository.findAll()
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByName(dto.roleName);
        if (role && user) {
            await user.$add('role', role.id);
            return { user, role }
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async login(dto: CreateUserDto) {
        const user = await this.authService.validateUser(dto)
        return this.authService.generateToken(user)
    }

    async deleteUserByEmail(email: string) {
        return await this.userRepository.destroy({ where: { email } })
    }
}
