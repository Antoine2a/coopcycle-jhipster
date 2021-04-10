import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';
import { UserCoopcycleService } from './user-coopcycle.service';

@Component({
  templateUrl: './user-coopcycle-delete-dialog.component.html',
})
export class UserCoopcycleDeleteDialogComponent {
  userCoopcycle?: IUserCoopcycle;

  constructor(
    protected userCoopcycleService: UserCoopcycleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userCoopcycleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userCoopcycleListModification');
      this.activeModal.close();
    });
  }
}
