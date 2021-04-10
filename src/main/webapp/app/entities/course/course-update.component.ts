import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICourse, Course } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import { IBasket } from 'app/shared/model/basket.model';
import { BasketService } from 'app/entities/basket/basket.service';

@Component({
  selector: 'jhi-course-update',
  templateUrl: './course-update.component.html',
})
export class CourseUpdateComponent implements OnInit {
  isSaving = false;
  baskets: IBasket[] = [];

  editForm = this.fb.group({
    id: [],
    idCourse: [null, [Validators.required]],
    basket: [],
  });

  constructor(
    protected courseService: CourseService,
    protected basketService: BasketService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => {
      this.updateForm(course);

      this.basketService.query().subscribe((res: HttpResponse<IBasket[]>) => (this.baskets = res.body || []));
    });
  }

  updateForm(course: ICourse): void {
    this.editForm.patchValue({
      id: course.id,
      idCourse: course.idCourse,
      basket: course.basket,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const course = this.createFromForm();
    if (course.id !== undefined) {
      this.subscribeToSaveResponse(this.courseService.update(course));
    } else {
      this.subscribeToSaveResponse(this.courseService.create(course));
    }
  }

  private createFromForm(): ICourse {
    return {
      ...new Course(),
      id: this.editForm.get(['id'])!.value,
      idCourse: this.editForm.get(['idCourse'])!.value,
      basket: this.editForm.get(['basket'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>): void {
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

  trackById(index: number, item: IBasket): any {
    return item.id;
  }
}
