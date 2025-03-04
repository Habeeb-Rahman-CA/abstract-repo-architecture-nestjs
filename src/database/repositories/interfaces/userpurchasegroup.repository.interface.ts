import { UserPurchaseGroup } from 'src/database/entities/userpurchasegroup.entity';
import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';

export interface UserPurchaseGroupRepositoryInterface
  extends BaseInterfaceRepository<UserPurchaseGroup> {
  getUserPurchaseGroup(
    params1: any,
    params2: any,
    params3: any,
    params4: any,
    params5: any,
    params6: any,
  );
}
