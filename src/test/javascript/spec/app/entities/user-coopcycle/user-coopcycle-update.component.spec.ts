import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MyblogTestModule } from '../../../test.module';
import { UserCoopcycleUpdateComponent } from 'app/entities/user-coopcycle/user-coopcycle-update.component';
import { UserCoopcycleService } from 'app/entities/user-coopcycle/user-coopcycle.service';
import { UserCoopcycle } from 'app/shared/model/user-coopcycle.model';

describe('Component Tests', () => {
  describe('UserCoopcycle Management Update Component', () => {
    let comp: UserCoopcycleUpdateComponent;
    let fixture: ComponentFixture<UserCoopcycleUpdateComponent>;
    let service: UserCoopcycleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyblogTestModule],
        declarations: [UserCoopcycleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UserCoopcycleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserCoopcycleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserCoopcycleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserCoopcycle(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserCoopcycle();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
