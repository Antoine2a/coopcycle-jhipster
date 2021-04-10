import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyblogSharedModule } from 'app/shared/shared.module';
import { CommerceComponent } from './commerce.component';
import { CommerceDetailComponent } from './commerce-detail.component';
import { CommerceUpdateComponent } from './commerce-update.component';
import { CommerceDeleteDialogComponent } from './commerce-delete-dialog.component';
import { commerceRoute } from './commerce.route';

@NgModule({
  imports: [MyblogSharedModule, RouterModule.forChild(commerceRoute)],
  declarations: [CommerceComponent, CommerceDetailComponent, CommerceUpdateComponent, CommerceDeleteDialogComponent],
  entryComponents: [CommerceDeleteDialogComponent],
})
export class MyblogCommerceModule {}
