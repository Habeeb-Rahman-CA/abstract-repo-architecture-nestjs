import { Department } from 'src/database/entities/department.entity';
import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';

export interface DepartmentRepositoryInterface
  extends BaseInterfaceRepository<Department> {
  getDepartment(params1: any, params2: any, params3: any);
}
