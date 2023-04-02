import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { User } from '../user/user.model';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    UserModule,
    AuthModule
  ]
})
export class ProfileModule {}
