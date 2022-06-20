import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { MarketLink } from '../../market-links/entities/market-link.entity';

@Table
export class ScreenshotCronJob extends Model {
  @Column
  schedule: string;

  @ForeignKey(() => MarketLink)
  marketLinkId: number;

  @BelongsTo(() => MarketLink)
  marketLink: MarketLink;
}
