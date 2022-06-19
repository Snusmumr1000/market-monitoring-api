import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { MarketLink } from './market-link.entity';

@Table
export class Screenshot extends Model {
  @Column
  content: string;

  @ForeignKey(() => MarketLink)
  marketLinkId: number;

  @BelongsTo(() => MarketLink)
  marketLink: MarketLink;
}
