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
} from "sequelize-typescript";
import { AdminUser } from './AdminUser';

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

    @Column({
        type: DataType.STRING(10000),
        allowNull: false
    })
    set permissionsID(val: any) {
        if (Array.isArray(val)) {
            this.setDataValue('permissionsID', val.join());
        } else {
            this.setDataValue('permissionsID', val);
        }
    }
    get permissionsID() {
        return (this.getDataValue('permissionsID')).split(',');
    }

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