import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TextBlock } from './text_block.model';
import { CreateTextBlockDto } from './dto/create_text_block.dto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class TextBlockService {
    constructor(@InjectModel(TextBlock) private textBlockRepository: typeof TextBlock,
        private fileService: FileService) { }

    async createTextBlock(dto: CreateTextBlockDto, image) {
        const pic = await this.fileService.createFile({ essenceTable: 'text_blocks', essenceId: dto.id }, image)
        return await this.textBlockRepository.create({ ...dto, picId: Number(pic.id) })
    }

    async getTextBlockById(id: string) {
        return await this.textBlockRepository.findByPk(id)
    }

    async getTextBlockByGroup(group: string) {
        return await this.textBlockRepository.findAll({ where: { group } })
    }

    async getTextBlock() {
        return await this.textBlockRepository.findAll()
    }

    // async updateTextBlock(dto: CreateTextBlockDto) {
    //     return await this.textBlockRepository.update(dto, { where: { id: dto.id } })
    // }

    async updateTextBlockWithFile(dto: CreateTextBlockDto, image) {
        let block
        if (image) {
            const pic = await this.fileService.createFile({ essenceTable: 'text_blocks', essenceId: dto.id }, image)
            block = await this.textBlockRepository.update({ ...dto, picId: pic.id }, { where: { id: dto.id } })
        }
        else{
            block = await this.textBlockRepository.update(dto, { where: { id: dto.id } })
        }
        return block
    }

    async deleteTextBlockById(id: string) {
        await this.fileService.nullFiles(id)
        return await this.textBlockRepository.destroy({ where: { id } })
    }
}