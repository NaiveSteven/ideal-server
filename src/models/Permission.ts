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

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    module_name: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

}