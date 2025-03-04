import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';
import { BudgetSubComponent } from 'src/database/entities/budgetsubcomponent.entity';

export interface BudgetSubComponentRepositoryInterface
  extends BaseInterfaceRepository<BudgetSubComponent> {
  getBudgetSubComponent(params1: any, params2: any, params3: any);
}
