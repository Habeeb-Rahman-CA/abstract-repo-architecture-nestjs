import { FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";

export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  findOneById(param: any): Promise<T>;

  findByCondition(filterCondition: any): Promise<T[]>;

  findOne(options: FindOneOptions<T>): Promise<T | null>;

  save(data: T): Promise<T>; 

  findAll(): Promise<T[]>;


  remove(entity: T | T[]): Promise<T | T[]>;

  findAndUpdate(condition: T | any, data: T | any): Promise<T>;

//   updateMany(condition: T | any, data: T | any): Promise<any>;

//   findByConditionWithSelect(filterCondition: any, select: any): Promise<T[]>;

//   createOrUpdate(condition: T | any, data: T | any): Promise<T>;

  paginate(query: T | any, data: T | any, pagination: T | any): Promise<T[]>;

  totalCount(query: T | any): Promise<T>;


//   documentExists(query: T | any): Promise<T | boolean>;

//   aggregate(query: T | any): Promise<T | any>;

//   findByConditionWithSort(query: T | any, sort: T | any): Promise<T | any>;

  // findByConditionWithPopulate(query: T | any, join: T | any): Promise<T | any>;
  findByConditionWithPaginationAndJoin(
    condition: FindOptionsWhere<T>,
    page: number,
    limit: number,
    sort?: string,
    relations?: any,
  ): Promise<{ data: T[]; total: number }>;

  findByConditionWithPaginationAndNestedJoin(
    condition: FindOptionsWhere<T>,
    page: number,
    limit: number,
    sort?: string,
    relations?: any,
    primaryconditions?: any,
    relationsconditions?: any,
  ): Promise<{ data: T[]; total: number }>;
  //   createMany(data: T | any): Promise<any>;
  findByConditionWithNestedJoin(
    condition: FindOptionsWhere<T>,
    sort?: string,
    relations?: any,
    relationsconditions?: any,
  ): Promise<{ data: T[]; total: number }>;
  //   createMany(data: T | any): Promise<any>;

  findByConditionWithPagination(
    condition: FindOptionsWhere<T>,
    page: number,
    limit: number,
    sort?: string,
  ): Promise<{ data: T[]; total: number }>;
}
