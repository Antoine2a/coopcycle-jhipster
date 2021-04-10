import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'courier',
        loadChildren: () => import('./courier/courier.module').then(m => m.MyblogCourierModule),
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.MyblogClientModule),
      },
      {
        path: 'merchant',
        loadChildren: () => import('./merchant/merchant.module').then(m => m.MyblogMerchantModule),
      },
      {
        path: 'user-coopcycle',
        loadChildren: () => import('./user-coopcycle/user-coopcycle.module').then(m => m.MyblogUserCoopcycleModule),
      },
      {
        path: 'basket',
        loadChildren: () => import('./basket/basket.module').then(m => m.MyblogBasketModule),
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.MyblogCourseModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.MyblogProductModule),
      },
      {
        path: 'cooperative',
        loadChildren: () => import('./cooperative/cooperative.module').then(m => m.MyblogCooperativeModule),
      },
      {
        path: 'commerce',
        loadChildren: () => import('./commerce/commerce.module').then(m => m.MyblogCommerceModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MyblogEntityModule {}
