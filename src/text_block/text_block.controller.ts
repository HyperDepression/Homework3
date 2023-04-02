import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TextBlockService } from './text_block.service';
import { CreateTextBlockDto } from './dto/create_text_block.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles_auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('text_block')
export class TextBlockController {
    constructor(private text_blockService: TextBlockService) { }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreateTextBlockDto, @UploadedFile() image) {
        return this.text_blockService.createTextBlock(dto, image)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.text_blockService.getTextBlockById(id);
    }

    @Get()
    getByGroup(@Body() data: {group: string}) {
        return this.text_blockService.getTextBlockByGroup(data.group);
    }

    @Get('/all')
    getAll() {
        return this.text_blockService.getTextBlock();
    }

    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    // @Put()
    // update(@Body() dto: CreateTextBlockDto) {
    //     return this.text_blockService.updateTextBlock(dto)
    // }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put()
    @UseInterceptors(FileInterceptor('image'))
    updateWithFile(@Body() dto: CreateTextBlockDto, @UploadedFile() image) {
        return this.text_blockService.updateTextBlockWithFile(dto, image)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteById(@Param('id') id: string) {
        return this.text_blockService.deleteTextBlockById(id)
    }
}
