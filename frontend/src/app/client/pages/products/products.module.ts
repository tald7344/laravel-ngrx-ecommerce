import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/@theme.module';

import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './components/all-products/all-products.component';


@NgModule({
  declarations: [AllProductsComponent],
  imports: [
    ThemeModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
