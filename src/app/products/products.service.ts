import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.interface';
import { map } from 'rxjs/operators';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  getProducts(): Observable<{ products: Product[] }> {
    // if (!this.endpointEnabled('bff')) {
    //   console.warn(
    //     'Endpoint "bff" is disabled. To enable change your environment.ts config'
    //   );
    //   return this.http.get<{products: Product[]}>('/assets/products.json');
    // }

    const url = this.getUrl('product', 'products');
    return this.http.get<{ products: Product[] }>(url);
  }

  getProductsForCheckout(ids: string[]): Observable<Product[]> {
    if (!ids.length) {
      return of([]);
    }

    return this.getProducts().pipe(
      map(({ products }) =>
        products.filter((product) => ids.includes(product.id))
      )
    );
  }
}
