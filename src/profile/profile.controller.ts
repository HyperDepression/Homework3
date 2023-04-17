import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create_profile.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles_auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt_auth.guard';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Post()
    register(@Body() dto: CreateProfileDto){
        return this.profileService.register(dto)
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.profileService.getProfileById(id);
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Put()
    update(@Param('id') id: number, @Body() dto: CreateProfileDto){
        return this.profileService.updateProfile(id, dto)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteById(@Param() id: number){
        return this.profileService.deleteProfileById(id)
    }
}
