import { StorageArea } from "src/database/entities/storagearea.entity";
import { BaseInterfaceRepository } from "../baseRepository/base.interface.repository";

export interface StorageAreaRepositoryInterface
  extends BaseInterfaceRepository<StorageArea> {
  getStorageArea(params1: any, params2: any, params3: any);
}