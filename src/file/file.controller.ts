import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileService } from "./file.service";
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles_auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create_file.dto';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) { }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreateFileDto, @UploadedFile() image) {
        return this.fileService.createFile(dto, image);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/:id')
    getByname(@Param('id') id: number) {
        return this.fileService.getFileById(id);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.fileService.getAllFiles();
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put('/:id')
    update(@Param('id') id: number, @Body() dto: CreateFileDto) {
        return this.fileService.updateFile(id, dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete()
    deleteUnused() {
        return this.fileService.deleteUnusedFiles();
    }
}