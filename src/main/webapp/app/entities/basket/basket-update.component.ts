import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBasket, Basket } from 'app/shared/model/basket.model';
import { BasketService } from './basket.service';
import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';
import { UserCoopcycleService } from 'app/entities/user-coopcycle/user-coopcycle.service';
import { ICommerce } from 'app/shared/model/commerce.model';
import { CommerceService } from 'app/entities/commerce/commerce.service';

type SelectableEntity = IUserCoopcycle | ICommerce;

@Component({
  selector: 'jhi-basket-update',
  templateUrl: './basket-update.component.html',
})
export class BasketUpdateComponent implements OnInit {
  isSaving = false;
  usercoopcycles: IUserCoopcycle[] = [];
  commerce: ICommerce[] = [];

  editForm = this.fb.group({
    id: [],
    totalprice: [],
    destination: [],
    userCoopcycle: [],
    commerce: [],
  });

  constructor(
    protected basketService: BasketService,
    protected userCoopcycleService: UserCoopcycleService,
    protected commerceService: CommerceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ basket }) => {
      this.updateForm(basket);

      this.userCoopcycleService.query().subscribe((res: HttpResponse<IUserCoopcycle[]>) => (this.usercoopcycles = res.body || []));

      this.commerceService.query().subscribe((res: HttpResponse<ICommerce[]>) => (this.commerce = res.body || []));
    });
  }

  updateForm(basket: IBasket): void {
    this.editForm.patchValue({
      id: basket.id,
      totalprice: basket.totalprice,
      destination: basket.destination,
      userCoopcycle: basket.userCoopcycle,
      commerce: basket.commerce,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const basket = this.createFromForm();
    if (basket.id !== undefined) {
      this.subscribeToSaveResponse(this.basketService.update(basket));
    } else {
      this.subscribeToSaveResponse(this.basketService.create(basket));
    }
  }

  private createFromForm(): IBasket {
    return {
      ...new Basket(),
      id: this.editForm.get(['id'])!.value,
      totalprice: this.editForm.get(['totalprice'])!.value,
      destination: this.editForm.get(['destination'])!.value,
      userCoopcycle: this.editForm.get(['userCoopcycle'])!.value,
      commerce: this.editForm.get(['commerce'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBasket>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
