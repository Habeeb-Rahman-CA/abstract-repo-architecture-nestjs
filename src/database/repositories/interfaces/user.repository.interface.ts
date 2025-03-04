import { User } from 'src/database/entities/user.entity';
import { BaseInterfaceRepository } from 'src/database/repositories/baseRepository/base.interface.repository';


  export interface UserRepositoryInterface
  extends BaseInterfaceRepository<User> {
    findOneByEmail(param:string);
    createUserData(param:object)
    emailExist(param:string)
    checkUserExistance(param:number)
    verifyPassword(param:number)
    updatePassword(param:number,param1:string)
    activateUser(param:number,param1:boolean,para2:string,param3:string)
    updateData(param:object,param1:number)
    removeInvalidRows(param1:string,param2:string)
    getUsers(param:object,param1:any,para2:any,param3:any,param4:any,param5:any,param6:any)
    getProfile(param:number)
    createHealthProfile(param:number,param1:number,param2:number,param3:string,param4:string)
    getUserById(param:number)
    findAllActiveUsers()
    getInfo(param:number)
}