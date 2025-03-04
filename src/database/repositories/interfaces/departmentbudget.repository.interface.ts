import { DepartmentBudget } from 'src/database/entities/departmentbudget.entity';
import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';
import { Department } from 'src/database/entities/department.entity';

export interface DepartmentBudgetRepositoryInterface
  extends BaseInterfaceRepository<DepartmentBudget> {
    getDepartmentBudget(params1: any, params2: any, params3: any,params4: any);
}
