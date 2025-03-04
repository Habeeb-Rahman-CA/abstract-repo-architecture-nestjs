import { Repository, EntityTarget, DataSource, FindManyOptions, FindOptionsWhere, FindOneOptions, SelectQueryBuilder, FindOptionsOrder, ObjectLiteral } from 'typeorm';
import { BaseInterfaceRepository } from './base.interface.repository';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

export abstract class BaseAbstractRepository<T extends ObjectLiteral> {
    protected repository: Repository<T>;
  
    protected constructor(entity: EntityTarget<T>, dataSource: DataSource) {
      this.repository = dataSource.getRepository(entity);
    }

  public async create(data: T): Promise<T> {
    const newEntity = this.repository.create(data);
    return await this.repository.save(newEntity);
  }

  public async deleteByCondition(condition: any): Promise<void> {
    try {
      await this.repository.delete(condition);
    } catch (error) {
      throw new InternalServerErrorException('Error deleting entity by condition', error);
    }
  }

  public async delete(data: any): Promise<T | null> {  // Allow returning null
    try {
      const result = await this.repository.delete(data.id);
  
      if (result.affected === 0) {
        throw new NotFoundException('Entity not found');
      }
  
      // Find the deleted entity (may return null)
      const deletedEntity = await this.repository.findOne({
        where: { id: data.id }
      });
  
      return deletedEntity; // Explicitly allow null
    } catch (error) {
      throw new InternalServerErrorException('Error deleting entity', error);
    }
  }
  
  public async findOneById(id: any): Promise<T | null> {  // Allow null return type
    const options: FindOptionsWhere<T> = id;
    return await this.repository.findOneBy(options); // findOneBy may return null
  }
  

  // public async findByCondition(filterCondition: any): Promise<T[]> {
  //   const options: FindManyOptions<T> = {
  //     where: filterCondition,
  //   };
  //   return await this.repository.find(options);
  // }
  public async findByCondition(filterCondition: any, relations: string[] = [], dateFields: string[] = []): Promise<T[]> {
    // Adjust date fields to handle date range queries
    if (dateFields && dateFields.length > 0) {
      dateFields.forEach((field) => {
        if (filterCondition[field] && filterCondition[field].$gte && filterCondition[field].$lte) {
          // Convert string dates to Date objects if they are in string format
          filterCondition[field].$gte = new Date(filterCondition[field].$gte);
          filterCondition[field].$lte = new Date(filterCondition[field].$lte);
        }
      });
    }
  
    const options: FindManyOptions<T> = {
      where: filterCondition,
      relations: relations.length > 0 ? relations : undefined, // Include relations only if specified
    };
  
    return await this.repository.find(options);
  }
  
  // New findOne implementation
  public async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options);
  }
  public async save(data: T): Promise<T> {
    return await this.repository.save(data);
  }
  public async findAndUpdate(condition: any, data: any): Promise<T> {
    // Find the entity based on the condition
    const entity = await this.repository.findOneBy(condition);

    // If the entity is found, update it with the new data
    if (entity) {
      const updatedEntity = this.repository.merge(entity, data);
      return await this.repository.save(updatedEntity);
    }

    // Throw an error or handle case when entity is not found
    throw new Error('Entity not found for the given condition');
  }

  async remove(entity: T | T[]): Promise<T | T[]> {
    let removedEntities: T | T[];
    if (Array.isArray(entity)) {
        if (entity.length === 0) {
            return []; 
        }
        removedEntities = await this.repository.remove(entity);
    } else {
        removedEntities = await this.repository.remove(entity);
    }
    return removedEntities; 
}
  public async paginate(
    queryBuilder: SelectQueryBuilder<T>,
    page: number,
    limit: number
  ): Promise<T[]> {
    const offset = (page - 1) * limit;
    
    return queryBuilder
      .skip(offset)
      .take(limit)
      .getMany(); // Fetching the results with pagination
  }
  public async totalCount(queryBuilder: SelectQueryBuilder<T>): Promise<any> {
    return queryBuilder.getCount();
  }

  // Helper to access the repository's query builder
  public getQueryBuilder(alias: string): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(alias);
  }

  async findByConditionWithPaginationAndJoin(
    condition: FindOptionsWhere<T>,
    page: number,
    limit: number,
    sort?: string,
    relations?: any,
    primaryEntitySearch?: { [key: string]: any },    // Search conditions for primary entity

  ): Promise<{ data: T[]; total: number }> {
    const queryBuilder: SelectQueryBuilder<T> = this.repository.createQueryBuilder('entity');

    const options: FindManyOptions<T> = {
      where: condition,
      skip: (page - 1) * limit,
      take: limit,
      relations: relations,
    };

    if (sort) {
      const [sortField, sortOrder] = sort.split(':');
      const order = {
        [sortField]: sortOrder === 'asc' ? 'ASC' : 'DESC',
      } as FindManyOptions<T>['order'];
      options.order = order;
    }
  // Apply search conditions for the main entity (e.g., ILIKE)
  if (primaryEntitySearch) {
    Object.keys(primaryEntitySearch).forEach((key) => {
      const value = primaryEntitySearch[key];
      queryBuilder.andWhere(`entity.${key} ILIKE :search_${key}`, {
        [`search_${key}`]: `%${value}%`,
      });
    });
  }
    const [data, total] = await this.repository.findAndCount(options);
    return { data, total };
  }
  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findByConditionWithPaginationAndNestedJoin(
    condition: FindOptionsWhere<T> = {},  // Main entity conditions
    page = 1,                             // Default page to 1 if not provided
    limit = 10,                           // Default limit to 10 if not provided
    sort?: string,                        // Sorting option in 'field:order' format
    relations?: string[],                 // Array of relations to join
    relationConditions: { [key: string]: any } = {}, // Conditions for relations
    primaryEntitySearch?: { [key: string]: any },    // Search conditions for primary entity
    relationSearch: { [key: string]: { [field: string]: any } } = {},  // Search conditions for relations
    additionalConditions: { [key: string]: string } = {}, // Additional conditions (e.g., `IS NOT NULL`)
    selectValues: string[] = [] // Optional array of fields to select
  ): Promise<{ data: T[]; total: number }> {
    const queryBuilder: SelectQueryBuilder<T> = this.repository.createQueryBuilder('entity');
  
    // Apply conditions for the main entity
    if (condition) {
      queryBuilder.where(condition);
    }
     // Apply additional conditions (e.g., `IS NOT NULL`, `LIKE`)
    if (additionalConditions) {
      Object.keys(additionalConditions).forEach((field) => {
        const conditionSQL = additionalConditions[field];
        if (conditionSQL === 'IS NOT NULL') {
          console.log(`Adding condition: ${field} IS NOT NULL`);
          queryBuilder.andWhere(`entity.${field} IS NOT NULL`);
        } else if (typeof conditionSQL === 'string' && conditionSQL.startsWith('LIKE')) {
          const value = conditionSQL.replace('LIKE ', '').trim();
          console.log(`Adding condition: ${field} LIKE %${value}%`);
          queryBuilder.andWhere(`entity.${field} LIKE :${field}`, { [field]: value });
        } else {
          console.log(`Adding condition: ${field} ${conditionSQL}`);
          queryBuilder.andWhere(`entity.${field} ${conditionSQL}`);
        }
      });
    }
    if (primaryEntitySearch) {
      Object.keys(primaryEntitySearch).forEach((key) => {
          const value = primaryEntitySearch[key];
          queryBuilder.andWhere(`entity.${key} ILIKE :search_${key}`, {
              [`search_${key}`]: `%${value}%`,
          });
          console.log(`Search condition applied: entity.${key} ILIKE %${value}%`);
      });
  }
  
    // Apply relations and their conditions dynamically
    if (relations && relations.length) {
      relations.forEach((relation) => {
        // Join relation (e.g., translators)
        queryBuilder.leftJoinAndSelect(`entity.${relation}`, relation);
  
        // Apply dynamic relation conditions (e.g., translators.language_code)
        if (relationConditions && relationConditions[relation]) {
          const conditions = relationConditions[relation];
          Object.keys(conditions).forEach((key) => {
            const value = conditions[key];
            queryBuilder.andWhere(`${relation}.${key} = :${relation}_${key}`, {
              [`${relation}_${key}`]: value,
            });
          });
        }
  
        // Apply search conditions for relations (e.g., translators.specialization_name ILIKE)
        if (relationSearch && relationSearch[relation]) {
          const searchConditions = relationSearch[relation];
          Object.keys(searchConditions).forEach((key) => {
            const value = searchConditions[key];
            queryBuilder.andWhere(`${relation}.${key} ILIKE :search_${relation}_${key}`, {
              [`search_${relation}_${key}`]: `%${value}%`,
            });
          });
        }
      });
    }
  
    // Handle sorting (if any)
    if (sort) {
      const [sortField, sortOrder] = sort.split(':');
      if (sortField && sortOrder) {
        queryBuilder.addOrderBy(
          sortField.includes('.') ? sortField : `entity.${sortField}`,
          sortOrder.toUpperCase() as 'ASC' | 'DESC'
        );
      }
    }
  
    // Select fields dynamically based on input
    if (selectValues && selectValues.length) {
      queryBuilder.select(selectValues);
    }

  
    // Pagination logic
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);
  
    const [data, total] = await queryBuilder.getManyAndCount();
  
    return { data, total };
  }
  
  

  async findByConditionWithPagination(
    condition: FindOptionsWhere<T> = {},  // Main entity conditions
    page = 1,                             // Default page to 1 if not provided
    limit = 10,                           // Default limit to 10 if not provided
    sort?: string,                        // Sorting option in 'field:order' format
    primaryEntitySearch?: { [key: string]: any },    // Search conditions for primary entity
  ): Promise<{ data: T[]; total: number }> {
    const queryBuilder: SelectQueryBuilder<T> = this.repository.createQueryBuilder('entity');
  
    // Apply conditions for the main entity
    if (condition) {
      queryBuilder.where(condition);
    }
  
    // Apply search conditions for the main entity (e.g., ILIKE)
    if (primaryEntitySearch) {
      Object.keys(primaryEntitySearch).forEach((key) => {
        const value = primaryEntitySearch[key];
        queryBuilder.andWhere(`entity.${key} ILIKE :search_${key}`, {
          [`search_${key}`]: `%${value}%`,
        });
      });
    }

    // Handle sorting (if any)
    if (sort) {
      const [sortField, sortOrder] = sort.split(':');
      if (sortField && sortOrder) {
        queryBuilder.addOrderBy(
          sortField.includes('.') ? sortField : `entity.${sortField}`,
          sortOrder.toUpperCase() as 'ASC' | 'DESC'
        );
      }
    }
  
    // Pagination logic
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);
  
  
    // Execute query and return data with total count
    const [data, total] = await queryBuilder.getManyAndCount();
  
    return { data, total };
  }
  async findByConditionWithNestedJoin(
    condition: FindOptionsWhere<T> = {},  // Main entity conditions
    sort?: string,                        // Sorting option in 'field:order' format
    relations?: string[],                 // Array of relations to join
    relationConditions: { [key: string]: any } = {}, // Conditions for relations
    primaryEntitySearch?: { [key: string]: any },    // Search conditions for primary entity
    relationSearch?: { [key: string]: { [field: string]: any } },  // Search conditions for relations
    selectValues: string[] = [] // Optional array of fields to select
  ): Promise<{ data: T[]; total: number }> {
    const queryBuilder: SelectQueryBuilder<T> = this.repository.createQueryBuilder('entity');
  
    // Apply conditions for the main entity
    if (condition) {
      queryBuilder.where(condition);
    }
  
    // Apply search conditions for the main entity (e.g., ILIKE)
    if (primaryEntitySearch) {
      Object.keys(primaryEntitySearch).forEach((key) => {
        const value = primaryEntitySearch[key];
        queryBuilder.andWhere(`entity.${key} ILIKE :search_${key}`, {
          [`search_${key}`]: `%${value}%`,
        });
      });
    }
  
    // Apply relations and their conditions dynamically
    if (relations && relations.length) {
      relations.forEach((relation) => {
        // Join relation (e.g., translators)
        queryBuilder.leftJoinAndSelect(`entity.${relation}`, relation);
  
        // Apply dynamic relation conditions (e.g., translators.language_code)
        if (relationConditions && relationConditions[relation]) {
          const conditions = relationConditions[relation];
          Object.keys(conditions).forEach((key) => {
            const value = conditions[key];
            queryBuilder.andWhere(`${relation}.${key} = :${relation}_${key}`, {
              [`${relation}_${key}`]: value,
            });
          });
        }
  
        // Apply search conditions for relations (e.g., translators.specialization_name ILIKE)
        if (relationSearch && relationSearch[relation]) {
          const searchConditions = relationSearch[relation];
          Object.keys(searchConditions).forEach((key) => {
            const value = searchConditions[key];
            queryBuilder.andWhere(`${relation}.${key} ILIKE :search_${relation}_${key}`, {
              [`search_${relation}_${key}`]: `%${value}%`,
            });
          });
        }
      });
    }
  
     // Handle sorting (if any)
     if (sort) {
      const [sortField, sortOrder] = sort.split(':');
      if (sortField && sortOrder) {
        queryBuilder.addOrderBy(
          sortField.includes('.') ? sortField : `entity.${sortField}`,
          sortOrder.toUpperCase() as 'ASC' | 'DESC'
        );
      }
    }
  // Select fields dynamically based on input
  if (selectValues && selectValues.length) {
    queryBuilder.select(selectValues);
  }
    // Execute query and return data with total count
    const [data, total] = await queryBuilder.getManyAndCount();
  
    return { data, total };
  }
  
}
