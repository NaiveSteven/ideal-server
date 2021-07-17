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
  @Column({
    type: DataType.STRING(32),
  })
  adminUserId: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50)
  })
  phone: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  avatar: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50)
  })
  nickname: string;

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
  set roles(val: any) {
    if (Array.isArray(val)) {
      this.setDataValue('roles', val.join());
    } else {
      this.setDataValue('roles', val);
    }
  }
  get roles() {
    return (this.getDataValue('roles')).split(',');
  }

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}