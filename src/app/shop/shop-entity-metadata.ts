import { EntityMetadataMap } from "@ngrx/data";
import { ProductModel } from "./products/product.model";

export const shopEntityMetadata: EntityMetadataMap = {
    Product:{
       selectId:(product:ProductModel) => product.productId
    }
}