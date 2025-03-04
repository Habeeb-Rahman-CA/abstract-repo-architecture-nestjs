import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Not } from "typeorm";
import { BaseAbstractRepository } from "./baseRepository/base.abstract.repository";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRepository extends BaseAbstractRepository<User> {
  constructor(protected readonly dataSource: DataSource) {
    super(User, dataSource);
  }
  async findOneByEmail(email) {
    try {
      const getUser = await this.findByCondition({ email: email });
      if (getUser.length > 0) return getUser[0];
      else return null;
    } catch (error) {
      throw error;
    }
  }
 
  async createUserData(userData) {
    try {
      const getUser = await this.create(userData);
      return getUser;
    } catch (error) {
      throw error;
    }
  }
  
  async emailExist(email: string): Promise<boolean> {
    try {
      const user = await this.findByCondition(
        {
          email: email.toLowerCase(), // Compare email in lowercase
          is_active: true, // Only return users with status 1
        },
      );
      return user.length > 0; // Return true if found, false otherwise
    } catch (error) {
      throw new Error(
        "Error checking email or mobile uniqueness: " + error.message
      );
    }
  }

  async checkUserExistance(user_id: number) {
    try {
      const checkUser = await this.findOne({
        where: { id: user_id }, // Get the latest OTP
      });
      if (checkUser) return true;
      else return false;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
  async verifyPassword(user_id: number) {
    try {
      console.log(user_id);
      const user = await this.findOne({
        where: { id: user_id }, // Get the latest OTP
      });

      if (!user) {
        return [];
      }
      return user;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
  async updatePassword(user_id: number, hashedPassword: string) {
    try {
      const updateData = await this.findAndUpdate(
        { id: user_id },
        { password: hashedPassword }
      );
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
  async activateUser(user_id, status, device_type, device_token) {
    try {
      const updateData = await this.findAndUpdate(
        { id: user_id },
        {
          status: status,
          device_type: device_type || null,
          device_token: device_token || null,
        }
      );
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
  async updateData(data, user_id) {
    try {
      const updateData = await this.findAndUpdate({ id: user_id }, data);
      return updateData;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
  async getUsers(
    query: any,
    limit: number,
    page: number,
    search: string,
  ): Promise<any> {
    try {
      const condition: Record<string, any> = {
        is_delete: false,is_active:true
      };

      const relationConditions: any = {};
      const offset = page ? page : 1;
      const fetchAll = !page && !limit;
      const limitValue = fetchAll ? undefined : limit;

      const sort = fetchAll ? 'title:ASC' : 'created_at:DESC';

      let searchTerm:any={}
      if (search) {
          searchTerm = { title: search };
      }
      const data = await this.findByConditionWithPaginationAndNestedJoin(
        condition,
        offset,
        limitValue,
        sort,
        relationConditions,
        searchTerm,
        {}
      );
      console.log(data.data)
      if (data.data.length > 0) {
        return data.data.map((item) => ({
          id:item.id,
          name:item.name,
          email:item.email,
          is_active:item.is_active,
        }));
      }

      throw new NotFoundException("Not found");
    } catch (error) {
      console.error("Error in get users:", error);
      throw error;
    }
  }
  async getUserById(user_id) {
    try {
      const getUser = await this.findByCondition({ id: user_id},["vendor_id","department_id","user_type_id"]);
      if (getUser.length > 0) return getUser[0];
      else return null;
    } catch (error) {
      throw error;
    }
  }
}
