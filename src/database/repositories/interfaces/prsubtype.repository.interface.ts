import { PrSubType } from 'src/database/entities/prsubtype.entity';
import { BaseInterfaceRepository } from 'src/database/repositories/baseRepository/base.interface.repository';


  export interface PrSubTypeRepositoryInterface
  extends BaseInterfaceRepository<PrSubType> {
    getSubTypes(param1:any,para2:any,param4:any,param3:any)
}