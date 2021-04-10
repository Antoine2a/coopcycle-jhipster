import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';
import { UserCoopcycleService } from './user-coopcycle.service';
import { UserCoopcycleDeleteDialogComponent } from './user-coopcycle-delete-dialog.component';

@Component({
  selector: 'jhi-user-coopcycle',
  templateUrl: './user-coopcycle.component.html',
})
export class UserCoopcycleComponent implements OnInit, OnDestroy {
  userCoopcycles?: IUserCoopcycle[];
  eventSubscriber?: Subscription;

  constructor(
    protected userCoopcycleService: UserCoopcycleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userCoopcycleService.query().subscribe((res: HttpResponse<IUserCoopcycle[]>) => (this.userCoopcycles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserCoopcycles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserCoopcycle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserCoopcycles(): void {
    this.eventSubscriber = this.eventManager.subscribe('userCoopcycleListModification', () => this.loadAll());
  }

  delete(userCoopcycle: IUserCoopcycle): void {
    const modalRef = this.modalService.open(UserCoopcycleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userCoopcycle = userCoopcycle;
  }
}
