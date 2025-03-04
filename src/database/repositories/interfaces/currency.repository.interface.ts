import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';
import { Currency } from 'src/database/entities/currency.entity';

export interface CurrencyRepositoryInterface
  extends BaseInterfaceRepository<Currency> {
  getCurrency(params1: any, params2: any, params3: any);
}
