import { PrType } from 'src/database/entities/prtype.entity';
import { User } from 'src/database/entities/user.entity';
import { BaseInterfaceRepository } from 'src/database/repositories/baseRepository/base.interface.repository';


  export interface PrTypeRepositoryInterface
  extends BaseInterfaceRepository<PrType> {
    getTypes(param1:any,para2:any,param3:any)
}