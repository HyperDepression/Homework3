import {Module} from '@nestjs/common';
import {RoleService} from './role.service';
import {RoleController} from './role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./role.model";
import {User} from "../user/user.model";
import {UserRole} from "./user_role.model";
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRole]),
    AuthModule
  ],
  exports: [
    RoleService
  ]
})
export class RoleModule {}