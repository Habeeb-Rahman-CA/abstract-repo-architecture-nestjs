import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';
import { Location } from 'src/database/entities/location.entity';

export interface LocationRepositoryInterface
  extends BaseInterfaceRepository<Location> {
  getLocation(params1: any, params2: any, params3: any);
}
