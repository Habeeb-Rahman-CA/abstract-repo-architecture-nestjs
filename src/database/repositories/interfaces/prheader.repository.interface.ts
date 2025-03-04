import { PrHeader } from 'src/database/entities/prheader.entity';
import { BaseInterfaceRepository } from 'src/database/repositories/baseRepository/base.interface.repository';


  export interface PrHeaderRepositoryInterface
  extends BaseInterfaceRepository<PrHeader> {
    getPr(
      limit: number | undefined,
      page: number | undefined,
      search: string | undefined,
      pr_type_id: number | undefined,
      pr_subtype_id: number | undefined,
      vendor_id: number | undefined,
      company_id: number | undefined,
      department_id: number | undefined,
      quotation_id: number | undefined,
      purchase_group_id: number | undefined,
      pr_status: number | undefined
    );}