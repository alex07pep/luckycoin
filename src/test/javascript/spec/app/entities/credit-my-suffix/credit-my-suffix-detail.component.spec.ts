/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LuckycoinTestModule } from '../../../test.module';
import { CreditMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/credit-my-suffix/credit-my-suffix-detail.component';
import { CreditMySuffixService } from '../../../../../../main/webapp/app/entities/credit-my-suffix/credit-my-suffix.service';
import { CreditMySuffix } from '../../../../../../main/webapp/app/entities/credit-my-suffix/credit-my-suffix.model';

describe('Component Tests', () => {

    describe('CreditMySuffix Management Detail Component', () => {
        let comp: CreditMySuffixDetailComponent;
        let fixture: ComponentFixture<CreditMySuffixDetailComponent>;
        let service: CreditMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LuckycoinTestModule],
                declarations: [CreditMySuffixDetailComponent],
                providers: [
                    CreditMySuffixService
                ]
            })
            .overrideTemplate(CreditMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CreditMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CreditMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CreditMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.credit).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
