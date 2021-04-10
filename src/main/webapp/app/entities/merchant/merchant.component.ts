import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMerchant } from 'app/shared/model/merchant.model';
import { MerchantService } from './merchant.service';
import { MerchantDeleteDialogComponent } from './merchant-delete-dialog.component';

@Component({
  selector: 'jhi-merchant',
  templateUrl: './merchant.component.html',
})
export class MerchantComponent implements OnInit, OnDestroy {
  merchants?: IMerchant[];
  eventSubscriber?: Subscription;

  constructor(protected merchantService: MerchantService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.merchantService.query().subscribe((res: HttpResponse<IMerchant[]>) => (this.merchants = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMerchants();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMerchant): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMerchants(): void {
    this.eventSubscriber = this.eventManager.subscribe('merchantListModification', () => this.loadAll());
  }

  delete(merchant: IMerchant): void {
    const modalRef = this.modalService.open(MerchantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.merchant = merchant;
  }
}
