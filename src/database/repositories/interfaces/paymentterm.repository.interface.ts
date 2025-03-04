import { PaymentTerm } from 'src/database/entities/paymentterm.entity';
import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';

export interface PaymentTermRepositoryInterface
  extends BaseInterfaceRepository<PaymentTerm> {
  getPaymentTerm(params1: any, params2: any, params3: any);
}
