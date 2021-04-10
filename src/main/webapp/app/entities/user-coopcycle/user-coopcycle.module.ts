import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyblogSharedModule } from 'app/shared/shared.module';
import { UserCoopcycleComponent } from './user-coopcycle.component';
import { UserCoopcycleDetailComponent } from './user-coopcycle-detail.component';
import { UserCoopcycleUpdateComponent } from './user-coopcycle-update.component';
import { UserCoopcycleDeleteDialogComponent } from './user-coopcycle-delete-dialog.component';
import { userCoopcycleRoute } from './user-coopcycle.route';

@NgModule({
  imports: [MyblogSharedModule, RouterModule.forChild(userCoopcycleRoute)],
  declarations: [UserCoopcycleComponent, UserCoopcycleDetailComponent, UserCoopcycleUpdateComponent, UserCoopcycleDeleteDialogComponent],
  entryComponents: [UserCoopcycleDeleteDialogComponent],
})
export class MyblogUserCoopcycleModule {}
