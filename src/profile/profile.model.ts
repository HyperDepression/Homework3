import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";

interface ProfileAttributes {
    name: string;
    surname: string;
    phone: string;
}

@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile, ProfileAttributes> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    surname: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    phone: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    users: User[]
}