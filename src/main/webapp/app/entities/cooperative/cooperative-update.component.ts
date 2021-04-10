import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICooperative, Cooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from './cooperative.service';
import { ICommerce } from 'app/shared/model/commerce.model';
import { CommerceService } from 'app/entities/commerce/commerce.service';

@Component({
  selector: 'jhi-cooperative-update',
  templateUrl: './cooperative-update.component.html',
})
export class CooperativeUpdateComponent implements OnInit {
  isSaving = false;
  commerce: ICommerce[] = [];

  editForm = this.fb.group({
    id: [],
    adress: [],
    commerce: [],
  });

  constructor(
    protected cooperativeService: CooperativeService,
    protected commerceService: CommerceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cooperative }) => {
      this.updateForm(cooperative);

      this.commerceService.query().subscribe((res: HttpResponse<ICommerce[]>) => (this.commerce = res.body || []));
    });
  }

  updateForm(cooperative: ICooperative): void {
    this.editForm.patchValue({
      id: cooperative.id,
      adress: cooperative.adress,
      commerce: cooperative.commerce,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cooperative = this.createFromForm();
    if (cooperative.id !== undefined) {
      this.subscribeToSaveResponse(this.cooperativeService.update(cooperative));
    } else {
      this.subscribeToSaveResponse(this.cooperativeService.create(cooperative));
    }
  }

  private createFromForm(): ICooperative {
    return {
      ...new Cooperative(),
      id: this.editForm.get(['id'])!.value,
      adress: this.editForm.get(['adress'])!.value,
      commerce: this.editForm.get(['commerce'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICooperative>>): void {
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

  trackById(index: number, item: ICommerce): any {
    return item.id;
  }

  getSelected(selectedVals: ICommerce[], option: ICommerce): ICommerce {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
