import { Vendor } from 'src/database/entities/vendor.entity';
import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';

export interface VendorRepositoryInterface
  extends BaseInterfaceRepository<Vendor> {
  getVendor(params1: any, params2: any, params3: any);
}
