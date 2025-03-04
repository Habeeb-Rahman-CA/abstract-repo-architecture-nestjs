import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';
import { TaxCode } from 'src/database/entities/taxcode.entity';

export interface TaxCodeRepositoryInterface
  extends BaseInterfaceRepository<TaxCode> {
  getTaxCode(params1: any, params2: any, params3: any);
}
