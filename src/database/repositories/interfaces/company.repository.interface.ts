import { Company } from 'src/database/entities/company.entity';
import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';

export interface CompanyRepositoryInterface
  extends BaseInterfaceRepository<Company> {
  getCompany(params1: any, params2: any, params3: any);
}
