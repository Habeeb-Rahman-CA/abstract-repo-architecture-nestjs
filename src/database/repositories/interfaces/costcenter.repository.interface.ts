import { CostCenter } from 'src/database/entities/costcenter.entity';
import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';

export interface CostCenterRepositoryInterface
  extends BaseInterfaceRepository<CostCenter> {
  getCostCenters(params1: any, params2: any, params3: any);
}
