import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt_auth.guard';
import { Roles } from '../auth/roles_auth.decorator';
import { AddRoleDto } from './dto/add_role.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.userService.login(dto)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto)
    }

    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard)
    @Get()
    getByEmail(@Body() data: {email: string}) {
        return this.userService.getUserByEmail(data.email)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/all')
    getAll() {
        return this.userService.getAllUsers();
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put()
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }

    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteByEmail(@Body() data: {email: string}) {
        return this.userService.deleteUserByEmail(data.email)
    }
}
