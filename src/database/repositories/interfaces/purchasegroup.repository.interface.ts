import { PurchaseGroup } from 'src/database/entities/purchasegroup.entity';
import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';

export interface PurchaseGroupRepositoryInterface
  extends BaseInterfaceRepository<PurchaseGroup> {
  getPurchaseGroup(params1: any, params2: any, params3: any);
}
