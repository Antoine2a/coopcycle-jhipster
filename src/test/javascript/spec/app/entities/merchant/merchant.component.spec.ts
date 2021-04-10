import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyblogTestModule } from '../../../test.module';
import { MerchantComponent } from 'app/entities/merchant/merchant.component';
import { MerchantService } from 'app/entities/merchant/merchant.service';
import { Merchant } from 'app/shared/model/merchant.model';

describe('Component Tests', () => {
  describe('Merchant Management Component', () => {
    let comp: MerchantComponent;
    let fixture: ComponentFixture<MerchantComponent>;
    let service: MerchantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MyblogTestModule],
        declarations: [MerchantComponent],
      })
        .overrideTemplate(MerchantComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MerchantComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MerchantService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Merchant(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.merchants && comp.merchants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
