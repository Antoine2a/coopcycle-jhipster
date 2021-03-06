import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyblogSharedModule } from 'app/shared/shared.module';
import { CourierComponent } from './courier.component';
import { CourierDetailComponent } from './courier-detail.component';
import { CourierUpdateComponent } from './courier-update.component';
import { CourierDeleteDialogComponent } from './courier-delete-dialog.component';
import { courierRoute } from './courier.route';

@NgModule({
  imports: [MyblogSharedModule, RouterModule.forChild(courierRoute)],
  declarations: [CourierComponent, CourierDetailComponent, CourierUpdateComponent, CourierDeleteDialogComponent],
  entryComponents: [CourierDeleteDialogComponent],
})
export class MyblogCourierModule {}
