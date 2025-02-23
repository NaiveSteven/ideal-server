import {
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import { AdminUser } from './AdminUser';
import { Module } from './Module';

@Table({
    tableName: 'Permission'
})
export class Permission extends Model<Permission> {

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

    @ForeignKey(() => Module)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    moduleId: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    permission: string;

    // 权限点类别 1菜单 2按钮 3数据
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    permission_type: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

}