import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUserCoopcycle, UserCoopcycle } from 'app/shared/model/user-coopcycle.model';
import { UserCoopcycleService } from './user-coopcycle.service';
import { ICommerce } from 'app/shared/model/commerce.model';
import { CommerceService } from 'app/entities/commerce/commerce.service';
import { ICooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from 'app/entities/cooperative/cooperative.service';

type SelectableEntity = ICommerce | ICooperative;

@Component({
  selector: 'jhi-user-coopcycle-update',
  templateUrl: './user-coopcycle-update.component.html',
})
export class UserCoopcycleUpdateComponent implements OnInit {
  isSaving = false;
  commerce: ICommerce[] = [];
  cooperatives: ICooperative[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    phone: [null, [Validators.minLength(10), Validators.maxLength(10)]],
    commerce: [],
    cooperative: [],
  });

  constructor(
    protected userCoopcycleService: UserCoopcycleService,
    protected commerceService: CommerceService,
    protected cooperativeService: CooperativeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userCoopcycle }) => {
      this.updateForm(userCoopcycle);

      this.commerceService
        .query({ filter: 'usercoopcycle-is-null' })
        .pipe(
          map((res: HttpResponse<ICommerce[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICommerce[]) => {
          if (!userCoopcycle.commerce || !userCoopcycle.commerce.id) {
            this.commerce = resBody;
          } else {
            this.commerceService
              .find(userCoopcycle.commerce.id)
              .pipe(
                map((subRes: HttpResponse<ICommerce>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICommerce[]) => (this.commerce = concatRes));
          }
        });

      this.cooperativeService
        .query({ filter: 'usercoopcycle-is-null' })
        .pipe(
          map((res: HttpResponse<ICooperative[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICooperative[]) => {
          if (!userCoopcycle.cooperative || !userCoopcycle.cooperative.id) {
            this.cooperatives = resBody;
          } else {
            this.cooperativeService
              .find(userCoopcycle.cooperative.id)
              .pipe(
                map((subRes: HttpResponse<ICooperative>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICooperative[]) => (this.cooperatives = concatRes));
          }
        });
    });
  }

  updateForm(userCoopcycle: IUserCoopcycle): void {
    this.editForm.patchValue({
      id: userCoopcycle.id,
      name: userCoopcycle.name,
      surname: userCoopcycle.surname,
      email: userCoopcycle.email,
      phone: userCoopcycle.phone,
      commerce: userCoopcycle.commerce,
      cooperative: userCoopcycle.cooperative,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userCoopcycle = this.createFromForm();
    if (userCoopcycle.id !== undefined) {
      this.subscribeToSaveResponse(this.userCoopcycleService.update(userCoopcycle));
    } else {
      this.subscribeToSaveResponse(this.userCoopcycleService.create(userCoopcycle));
    }
  }

  private createFromForm(): IUserCoopcycle {
    return {
      ...new UserCoopcycle(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      email: this.editForm.get(['email'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      commerce: this.editForm.get(['commerce'])!.value,
      cooperative: this.editForm.get(['cooperative'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserCoopcycle>>): void {
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
