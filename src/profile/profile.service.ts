import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { CreateProfileDto } from './dto/create_profile.dto';
import { UserService } from "../user/user.service";
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
        private userService: UserService,
        private authService: AuthService) { }

    async register(dto: CreateProfileDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword: string = await bcrypt.hash(dto.password, 5);
        const profile = await this.profileRepository.create(dto)
        const user = await this.userService.createUser({ email: dto.email, password: hashPassword, profileId: profile.id })
        await this.profileRepository.update({ userId: user.id }, { where: { id: profile.id } })
        return this.authService.generateToken(user)
    }

    async getProfileById(id: number) {
        return await this.profileRepository.findByPk(id, { include: { all: true } })
    }

    async updateProfile(dto: CreateProfileDto) {
        return await this.profileRepository.update(dto, { where: { id: dto.profileId } })
    }

    async deleteProfileById(id: number) {
        return await this.profileRepository.destroy({ where: { id } })
    }
}