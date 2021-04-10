import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IClient, Client } from 'app/shared/model/client.model';
import { ClientService } from './client.service';
import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';
import { UserCoopcycleService } from 'app/entities/user-coopcycle/user-coopcycle.service';

@Component({
  selector: 'jhi-client-update',
  templateUrl: './client-update.component.html',
})
export class ClientUpdateComponent implements OnInit {
  isSaving = false;
  usercoopcycles: IUserCoopcycle[] = [];

  editForm = this.fb.group({
    id: [],
    adress: [],
    userCoopcycle: [],
  });

  constructor(
    protected clientService: ClientService,
    protected userCoopcycleService: UserCoopcycleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);

      this.userCoopcycleService
        .query({ filter: 'client-is-null' })
        .pipe(
          map((res: HttpResponse<IUserCoopcycle[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IUserCoopcycle[]) => {
          if (!client.userCoopcycle || !client.userCoopcycle.id) {
            this.usercoopcycles = resBody;
          } else {
            this.userCoopcycleService
              .find(client.userCoopcycle.id)
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

  updateForm(client: IClient): void {
    this.editForm.patchValue({
      id: client.id,
      adress: client.adress,
      userCoopcycle: client.userCoopcycle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  private createFromForm(): IClient {
    return {
      ...new Client(),
      id: this.editForm.get(['id'])!.value,
      adress: this.editForm.get(['adress'])!.value,
      userCoopcycle: this.editForm.get(['userCoopcycle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>): void {
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
