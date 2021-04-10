import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMerchant, Merchant } from 'app/shared/model/merchant.model';
import { MerchantService } from './merchant.service';
import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';
import { UserCoopcycleService } from 'app/entities/user-coopcycle/user-coopcycle.service';

@Component({
  selector: 'jhi-merchant-update',
  templateUrl: './merchant-update.component.html',
})
export class MerchantUpdateComponent implements OnInit {
  isSaving = false;
  usercoopcycles: IUserCoopcycle[] = [];

  editForm = this.fb.group({
    id: [],
    userCoopcycle: [],
  });

  constructor(
    protected merchantService: MerchantService,
    protected userCoopcycleService: UserCoopcycleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ merchant }) => {
      this.updateForm(merchant);

      this.userCoopcycleService
        .query({ filter: 'merchant-is-null' })
        .pipe(
          map((res: HttpResponse<IUserCoopcycle[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IUserCoopcycle[]) => {
          if (!merchant.userCoopcycle || !merchant.userCoopcycle.id) {
            this.usercoopcycles = resBody;
          } else {
            this.userCoopcycleService
              .find(merchant.userCoopcycle.id)
              .pipe(
                map((subRes: HttpResponse<IUserCoopcycle>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IUserCoopcycle[]) => (this.usercoopcycles = concatRes));
          }
        });
    });
  }

  updateForm(merchant: IMerchant): void {
    this.editForm.patchValue({
      id: merchant.id,
      userCoopcycle: merchant.userCoopcycle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const merchant = this.createFromForm();
    if (merchant.id !== undefined) {
      this.subscribeToSaveResponse(this.merchantService.update(merchant));
    } else {
      this.subscribeToSaveResponse(this.merchantService.create(merchant));
    }
  }

  private createFromForm(): IMerchant {
    return {
      ...new Merchant(),
      id: this.editForm.get(['id'])!.value,
      userCoopcycle: this.editForm.get(['userCoopcycle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMerchant>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUserCoopcycle): any {
    return item.id;
  }
}
