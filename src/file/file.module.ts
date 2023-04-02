import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File } from './file.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
    SequelizeModule.forFeature([File]),
    AuthModule
  ],
  exports: [FileService]
})
export class FileModule {}