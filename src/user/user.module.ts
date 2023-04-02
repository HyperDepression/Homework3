import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';
import { User } from './user.model';
import { Role } from '../role/role.model';
import { UserRole } from '../role/user_role.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole]),
    RoleModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UserService
  ]
})
export class UserModule { }
