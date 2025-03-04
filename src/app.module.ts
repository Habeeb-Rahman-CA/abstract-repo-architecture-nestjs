import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { AuthModule } from './modules/auth/auth.module';
import { PrTypeModule } from './modules/prtypes/prtype.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { CompanyModule } from './modules/company/company.module';
import { PrSubTypeModule } from './modules/prsubtypes/prsubtype.module';
import { PaymentTermModule } from './modules/paymentterm/paymentterm.module';
import { DeliveryTermModule } from './modules/deliveryterm/deliveryterm.module';
import { PurchaseGroupModule } from './modules/purchasegroup/purchasegroup.module';
import { DepartmentModule } from './modules/department/department.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { TaxCodeModule } from './modules/taxcode/taxcode.module';
import { UserTypeModule } from './modules/usertype/usertype.module';
import { GlaAccountModule } from './modules/glaaccount/glaaccount.module';
import { DepartmentBudgetModule } from './modules/departmentbudget/deptbudget.module';
import { PlantModule } from './modules/plant/plant.module';
import { CostCenterModule } from './modules/costcenter/company.module';
import { EquipmentVehicleModule } from './modules/equipmentvehicle/equipmentvehicle.module';
import { LocationModule } from './modules/location/location.module';
import { StorageAreaModule } from './modules/storagearea/storagearea.module';
import { VendorPurchaseGroupModule } from './modules/vendorpurchasegroup/vendorpurchasegroup.module';
import { UserPurchaseGroupModule } from './modules/userpurchasegroup/userpurchasegroup.module';
import { ItemSubCategoryModule } from './modules/itemsubcategory/itemsubcategory.module';
import { PrHeaderModule } from './modules/pr/pr.module';
import { BudgetSubComponentModule } from './modules/budgetsubcomponent/budgetsubcomponent.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    UserModule,
    AuthModule,
    PrTypeModule,
    PrSubTypeModule,
    VendorModule,
    CompanyModule,
    PaymentTermModule,
    DeliveryTermModule,
    PurchaseGroupModule,
    DepartmentModule,
    CurrencyModule,
    TaxCodeModule,
    UserTypeModule,
    GlaAccountModule,
    DepartmentBudgetModule,
    PlantModule,
    CostCenterModule,
    EquipmentVehicleModule,
    LocationModule,
    StorageAreaModule,
    VendorPurchaseGroupModule,
    UserPurchaseGroupModule,
    ItemSubCategoryModule,
    PrHeaderModule,
    BudgetSubComponentModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
