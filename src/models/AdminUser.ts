import {
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
} from 'sequelize-typescript';

@Table({
  tableName: 'AdminUser',
})
export class AdminUser extends Model<AdminUser> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(50)
  })
  username: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(32),
  })
  password: string;

  @Column({
    type: DataType.STRING(10000),
    allowNull: false
  })
  roles: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}