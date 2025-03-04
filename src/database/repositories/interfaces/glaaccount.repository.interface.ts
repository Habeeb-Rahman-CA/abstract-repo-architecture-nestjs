import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';
import { GlaAccount } from 'src/database/entities/glaaccount.entity';

export interface GlaAccountRepositoryInterface
  extends BaseInterfaceRepository<GlaAccount> {
    getGlaAccount(params1: any, params2: any, params3: any);
}
