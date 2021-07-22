import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductsComponent } from './products/products.component';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { shopEntityMetadata  } from './shop-entity-metadata';
import { FormsModule } from '@angular/forms';
import { ProductDataService } from './products/product.data.service';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ShopRoutingModule, FormsModule],
})
export class ShopModule {
  constructor(
    entityDefinitionService: EntityDefinitionService,
    entitydataService: EntityDataService,
    productDataService:ProductDataService
  ) {
    entityDefinitionService.registerMetadataMap(shopEntityMetadata);
    entitydataService.registerService('Product', productDataService);
  }
}
