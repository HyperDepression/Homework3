import { Module } from '@nestjs/common';
import { TextBlockController } from './text_block.controller';
import { TextBlockService } from './text_block.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextBlock } from './text_block.model';
import { FileModule } from 'src/file/file.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TextBlockController],
  providers: [TextBlockService],
  imports: [
    SequelizeModule.forFeature([TextBlock]),
    FileModule,
    AuthModule
  ]
})
export class TextBlockModule {}
