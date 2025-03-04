import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';
import { VendorPurchaseGroup } from 'src/database/entities/vendorpurchasegroupcompany.entity';

export interface VendorPurchaseGroupRepositoryInterface
  extends BaseInterfaceRepository<VendorPurchaseGroup> {
  getVendorPurchaseGroups(params1: any, params2: any, params3: any, params4: any,params5: any);
}
