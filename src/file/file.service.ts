import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from "./file.model";
import * as uuid from 'uuid';
import * as path from 'path'
import * as fs from 'fs';
import { Op } from 'sequelize';
import { CreateFileDto } from './dto/create_file.dto';

@Injectable()
export class FileService {
    constructor(@InjectModel(File) private fileRepository: typeof File) { }

    async createFile(dto: CreateFileDto, file) {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return await this.fileRepository.create({ ...dto, name: fileName })
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getFileById(id) {
        return await this.fileRepository.findByPk(id)
    }

    async getAllFiles() {
        return await this.fileRepository.findAll()
    }

    async updateFile(id: number, dto: CreateFileDto) {
        return this.fileRepository.update(dto, { where: { id } })
    }

    async nullFiles(essenceId: string) {
        return await this.fileRepository.update({ essenceTable: null, essenceId: null }, { where: { essenceId } })
    }

    async deleteUnusedFiles() {
        const deletionTime = new Date(Date.now() - 3600000)
        return await this.fileRepository.destroy({ where: { essenceId: null, essenceTable: null, createdAt: { [Op.lt]: deletionTime } } })
    }
}