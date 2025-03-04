import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';
import { Plant } from 'src/database/entities/plant.entity';

export interface PlantRepositoryInterface
  extends BaseInterfaceRepository<Plant> {
  getPlants(params1: any, params2: any, params3: any);
}
