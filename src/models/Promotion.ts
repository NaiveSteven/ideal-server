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
import { GoodsType } from './GoodsType';
import { Brand } from './Brand';

@Table({
  tableName: 'Promotion'
})
export class Promotion extends Model<Promotion> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => GoodsType)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  goodsTypeId: number;

  @ForeignKey(() => Brand)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  brandId: number;

  // 名称
  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  name: string;

  // 描述
  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  desc: string;

  // 价格
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  price: number;

  // 市场价
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  marketPrice: number;

  // 图片
  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  imageUrl: string;

  // 规格
  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  size: string;

  // 状态 销售中 下架 售罄
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  state: number;

  // 数量（库存）
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  count: number;

  // 销量
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  saleNum: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

}