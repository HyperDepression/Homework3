import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "../role/role.model";
import { UserRole } from "../role/user_role.model";
import { Profile } from "../profile/profile.model";

interface UserAttributes {
    email: string;
    password: string;
    profileId: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserAttributes> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    password: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ForeignKey(() => Profile)
    @Column({ type: DataType.INTEGER })
    profileId: number;

    @BelongsTo(() => Profile)
    profiles: Profile[];

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];
}