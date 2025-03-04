import { UserRole } from 'src/database/entities/userrole.entity';
import { BaseInterfaceRepository } from 'src/database/repositories/baseRepository/base.interface.repository';


  export interface UserRoleRepositoryInterface
  extends BaseInterfaceRepository<UserRole> {
    createUserData(param:object)
    updateData(param:object,param1:number)
    getUserById(param:number)
}