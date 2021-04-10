import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyblogTestModule } from '../../../test.module';
import { UserCoopcycleDetailComponent } from 'app/entities/user-coopcycle/user-coopcycle-detail.component';
import { UserCoopcycle } from 'app/shared/model/user-coopcycle.model';

describe('Component Tests', () => {
  describe('UserCoopcycle Management Detail Component', () => {
    let comp: UserCoopcycleDetailComponent;
    let fixture: ComponentFixture<UserCoopcycleDetailComponent>;
    const route = ({ data: of({ userCoopcycle: new UserCoopcycle(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyblogTestModule],
        declarations: [UserCoopcycleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserCoopcycleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserCoopcycleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userCoopcycle on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userCoopcycle).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
