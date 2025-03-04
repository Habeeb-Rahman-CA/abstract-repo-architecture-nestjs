import { DeliveryTerm } from 'src/database/entities/deliveryterm.entity';
import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';

export interface DeliveryTermRepositoryInterface
  extends BaseInterfaceRepository<DeliveryTerm> {
  getDeliveryTerm(params1: any, params2: any, params3: any);
}
