import {
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
    HasMany
} from "sequelize-typescript";
import { AdminUser } from './AdminUser';
import { Permission } from './Permission';

@Table({
    tableName: 'Role'
})
export class Role extends Model<Role> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => AdminUser)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    adminUserId: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    name: string;

    @HasMany(() => Permission)
    permissions: Permission[];

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    remark: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

}