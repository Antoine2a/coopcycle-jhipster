import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICommerce, Commerce } from 'app/shared/model/commerce.model';
import { CommerceService } from './commerce.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

@Component({
  selector: 'jhi-commerce-update',
  templateUrl: './commerce-update.component.html',
})
export class CommerceUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    adress: [],
    notationCommerce: [],
    type: [],
    products: [],
  });

  constructor(
    protected commerceService: CommerceService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commerce }) => {
      this.updateForm(commerce);

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
    });
  }

  updateForm(commerce: ICommerce): void {
    this.editForm.patchValue({
      id: commerce.id,
      adress: commerce.adress,
      notationCommerce: commerce.notationCommerce,
      type: commerce.type,
      products: commerce.products,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commerce = this.createFromForm();
    if (commerce.id !== undefined) {
      this.subscribeToSaveResponse(this.commerceService.update(commerce));
    } else {
      this.subscribeToSaveResponse(this.commerceService.create(commerce));
    }
  }

  private createFromForm(): ICommerce {
    return {
      ...new Commerce(),
      id: this.editForm.get(['id'])!.value,
      adress: this.editForm.get(['adress'])!.value,
      notationCommerce: this.editForm.get(['notationCommerce'])!.value,
      type: this.editForm.get(['type'])!.value,
      products: this.editForm.get(['products'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommerce>>): void {
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

  trackById(index: number, item: IProduct): any {
    return item.id;
  }

  getSelected(selectedVals: IProduct[], option: IProduct): IProduct {
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
