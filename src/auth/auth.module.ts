import { forwardRef, Module  } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '12h'
      }
    }),
    forwardRef(() => UserModule)
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule { }
