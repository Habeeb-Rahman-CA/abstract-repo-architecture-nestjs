import { User } from 'src/database/entities/user.entity';
import { UserTypes } from 'src/database/entities/usertype.entity';
import { BaseInterfaceRepository } from 'src/database/repositories/baseRepository/base.interface.repository';


  export interface UserTypeRepositoryInterface
  extends BaseInterfaceRepository<UserTypes> {
    getUserTypes(param:any,param1:any,para2:any)
}