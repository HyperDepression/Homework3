import { Column, DataType, Model, Table } from "sequelize-typescript";

interface FileAttributes {
    name: string
    essenceTable: string;
    essenceId: string;
}

@Table({ tableName: 'files' })
export class File extends Model<File, FileAttributes> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    essenceTable: string;

    @Column({ type: DataType.STRING, allowNull: true })
    essenceId: string;
}