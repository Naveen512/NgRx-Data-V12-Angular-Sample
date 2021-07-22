import { Component, OnInit } from '@angular/core';
import {
  EntityCollectionService,
  EntityCollectionServiceFactory,
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { ProductModel } from './product.model';
declare var window: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  allProducts$: Observable<ProductModel[]>;
  productService: EntityCollectionService<ProductModel>;
  myModal: any;
  productForm: ProductModel = {
    description: '',
    manufacturer: '',
    name: '',
    price: 0,
    productId: 0,
  };
  modalTitle: string = '';
  productIdToDelete :number = 0;
  deleteModal:any;
  constructor(entityCollectionServiceFactory: EntityCollectionServiceFactory) {
    this.productService =
      entityCollectionServiceFactory.create<ProductModel>('Product');
    this.allProducts$ = this.productService.entities$;
  }

  ngOnInit(): void {
    this.productService.getAll();
    this.myModal = new window.bootstrap.Modal(
      document.getElementById('productsModal'),
      {
        keyboard: false,
      }
    );
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal'),
      {
        keyboard: false,
      }
    )
  }

  openModal(productId: number) {
    if (productId == 0) {
      this.modalTitle = 'Add Product';
      this.productForm = {
        description: '',
        manufacturer: '',
        name: '',
        price: 0,
        productId: 0,
      };
    } else {
      this.modalTitle = 'Update Product';
      this.productService.entities$.subscribe((data) => {
        let filteredProduct = data.filter((_) => _.productId == productId)[0];
        this.productForm = {...filteredProduct};
      });
    }
    this.myModal.show();
  }

  saveorupdate() {
    if (this.productForm.productId == 0) {
      this.productService
        .add(this.productForm)
        .subscribe((_) => this.myModal.hide());
    } else {
      this.productService
        .update(this.productForm)
        .subscribe((_) => this.myModal.hide());
    }
  }

  openDeleteModal(productId: number){
    this.productIdToDelete = productId;
    this.deleteModal.show();
  }
  delete(){
    this.productService.delete(this.productIdToDelete)
    .subscribe(_ => this.deleteModal.hide());
  }
}
