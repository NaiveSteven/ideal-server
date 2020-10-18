import {
    DefaultScope,
    Scopes,
    Table,
    Column,
    Model,
    AutoIncrement,
    AllowNull,
    DataType,
    Unique,
    PrimaryKey,
    CreatedAt,
    UpdatedAt,
    ForeignKey
} from 'sequelize-typescript';
import crypto from "crypto";
import { AdminUser } from './AdminUser';

// @DefaultScope(() => ({
//     attributes: ['id', 'name', 'CreatedAt', 'UpdatedAt']
// }))
// @Scopes(() => ({
//     all: {
//         attributes: ['id', 'name', 'password', 'CreatedAt', 'UpdatedAt']
//     }
// }))
@Table({
    tableName: 'User',
})
export class User extends Model<User> {

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

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(50)
    })
    name: string;

    // @AllowNull(false)
    // @Column({
    //     type: DataType.STRING(32),
    //     field: 'password'
    // })
    // _password: string;

    @Column
    set password(val: string) {
        let md5 = crypto.createHash('md5');
        let newPassword = md5.update(val).digest('hex');
        this.setDataValue('password', newPassword);
    }

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}