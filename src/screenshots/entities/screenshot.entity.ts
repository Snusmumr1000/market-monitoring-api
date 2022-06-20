import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { MarketLink } from '../../market-links/entities/market-link.entity';
import { DataTypes } from 'sequelize';

@Table
export class Screenshot extends Model {
  @Column(DataTypes.TEXT('long'))
  content: string;

  @ForeignKey(() => MarketLink)
  marketLinkId: number;

  @BelongsTo(() => MarketLink)
  marketLink: MarketLink;
}
