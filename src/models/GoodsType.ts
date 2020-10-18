import {
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    ForeignKey, HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import { AdminUser } from './AdminUser';

@Table({
    tableName: 'GoodsType'
})
export class GoodsType extends Model<GoodsType> {

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

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

}