import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { ProductModel } from './product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService extends DefaultDataService<ProductModel> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Product', http, httpUrlGenerator);
  }

  getAll(): Observable<ProductModel[]> {
    return this.http.get('https://localhost:44324/api/Products/').pipe(
      map((data) => {
        if (!data) {
          return [];
        }
        return (data as ProductModel[]).map((d) => {
          return { ...d, price: 0 };
        });
      })
    );
  }
}
