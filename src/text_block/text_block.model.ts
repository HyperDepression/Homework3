import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TextBlockAttributes {
    id: string
    name: string;
    text: string;
    group: string
    picId: number;
}

@Table({ tableName: 'text_blocks' })
export class TextBlock extends Model<TextBlock, TextBlockAttributes> {
    @Column({ type: DataType.STRING, primaryKey: true })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    text: string;

    @Column({ type: DataType.STRING, allowNull: false })
    group: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    picId: number;
}