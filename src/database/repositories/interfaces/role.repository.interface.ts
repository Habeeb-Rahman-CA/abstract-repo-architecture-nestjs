import { Role } from 'src/database/entities/role.entity';
import { BaseInterfaceRepository } from 'src/database/repositories/baseRepository/base.interface.repository';


  export interface RoleRepositoryInterface
  extends BaseInterfaceRepository<Role> {
    getRoleById(param:number)
}