import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICourier, Courier } from 'app/shared/model/courier.model';
import { CourierService } from './courier.service';
import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';
import { UserCoopcycleService } from 'app/entities/user-coopcycle/user-coopcycle.service';

@Component({
  selector: 'jhi-courier-update',
  templateUrl: './courier-update.component.html',
})
export class CourierUpdateComponent implements OnInit {
  isSaving = false;
  usercoopcycles: IUserCoopcycle[] = [];

  editForm = this.fb.group({
    id: [],
    notation: [],
    latitude: [],
    longitude: [],
    userCoopcycle: [],
  });

  constructor(
    protected courierService: CourierService,
    protected userCoopcycleService: UserCoopcycleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ courier }) => {
      this.updateForm(courier);

      this.userCoopcycleService
        .query({ filter: 'courier-is-null' })
        .pipe(
          map((res: HttpResponse<IUserCoopcycle[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IUserCoopcycle[]) => {
          if (!courier.userCoopcycle || !courier.userCoopcycle.id) {
            this.usercoopcycles = resBody;
          } else {
            this.userCoopcycleService
              .find(courier.userCoopcycle.id)
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

  updateForm(courier: ICourier): void {
    this.editForm.patchValue({
      id: courier.id,
      notation: courier.notation,
      latitude: courier.latitude,
      longitude: courier.longitude,
      userCoopcycle: courier.userCoopcycle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const courier = this.createFromForm();
    if (courier.id !== undefined) {
      this.subscribeToSaveResponse(this.courierService.update(courier));
    } else {
      this.subscribeToSaveResponse(this.courierService.create(courier));
    }
  }

  private createFromForm(): ICourier {
    return {
      ...new Courier(),
      id: this.editForm.get(['id'])!.value,
      notation: this.editForm.get(['notation'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      userCoopcycle: this.editForm.get(['userCoopcycle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourier>>): void {
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
