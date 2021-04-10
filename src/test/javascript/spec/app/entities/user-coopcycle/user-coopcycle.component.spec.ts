import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyblogTestModule } from '../../../test.module';
import { UserCoopcycleComponent } from 'app/entities/user-coopcycle/user-coopcycle.component';
import { UserCoopcycleService } from 'app/entities/user-coopcycle/user-coopcycle.service';
import { UserCoopcycle } from 'app/shared/model/user-coopcycle.model';

describe('Component Tests', () => {
  describe('UserCoopcycle Management Component', () => {
    let comp: UserCoopcycleComponent;
    let fixture: ComponentFixture<UserCoopcycleComponent>;
    let service: UserCoopcycleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyblogTestModule],
        declarations: [UserCoopcycleComponent],
      })
        .overrideTemplate(UserCoopcycleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserCoopcycleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserCoopcycleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserCoopcycle(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userCoopcycles && comp.userCoopcycles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
