import { BaseInterfaceRepository } from '../baseRepository/base.interface.repository';
import { ItemSubCategory } from 'src/database/entities/itemsubcategory.entity';

export interface ItemSubCategoryRepositoryInterface
  extends BaseInterfaceRepository<ItemSubCategory> {
    getItemSubCategories(params1: any, params2: any, params3: any,param4:any,param5:any);
}
