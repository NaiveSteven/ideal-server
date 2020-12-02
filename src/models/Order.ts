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
import { User } from './User';
import { Goods } from './Goods';

@Table({
  tableName: 'Order'
})
export class Order extends Model<Order> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  userId: number;

  @ForeignKey(() => Goods)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  goodsId: number;

  // 手机号
  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  phone: string;

  // 地址
  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  address: string;

  // 价格
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  price: number;

  // 1未付款，2已付款未发货，3已发货未确认收到，4确认到货订单完成
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  state: number;

  // 购买数量
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  count: number;

  // 处理状态 1未处理 2接受处理 3处理完成
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  deal_state: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

}