import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create_role.dto";
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles_auth.decorator';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) { }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/:name')
    getByname(@Param('name') name: string) {
        return this.roleService.getRoleByName(name);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.roleService.getAllRoles();
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/:name')
    deleteByName(@Param('name') name: string) {
        return this.roleService.deleteRoleByName(name);
    }
}