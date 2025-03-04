import { EquipmentVehicle } from 'src/database/entities/equipmentvehicle.entity';
import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';

export interface EquipmentVehicleRepositoryInterface
  extends BaseInterfaceRepository<EquipmentVehicle> {
  getEquipmentVehicle(params1: any, params2: any, params3: any);
}
