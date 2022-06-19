import { MarketLink } from './entities/market-link.entity';

export const MarketLinkRepositoryType = 'MARKET_LINK_REPOSITORY';

export const marketLinkProvider = [
  {
    provide: MarketLinkRepositoryType,
    useValue: MarketLink,
  },
];
