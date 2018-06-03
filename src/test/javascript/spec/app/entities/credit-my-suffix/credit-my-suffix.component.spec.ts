/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LuckycoinTestModule } from '../../../test.module';
import { CreditMySuffixComponent } from '../../../../../../main/webapp/app/entities/credit-my-suffix/credit-my-suffix.component';
import { CreditMySuffixService } from '../../../../../../main/webapp/app/entities/credit-my-suffix/credit-my-suffix.service';
import { CreditMySuffix } from '../../../../../../main/webapp/app/entities/credit-my-suffix/credit-my-suffix.model';

describe('Component Tests', () => {

    describe('CreditMySuffix Management Component', () => {
        let comp: CreditMySuffixComponent;
        let fixture: ComponentFixture<CreditMySuffixComponent>;
        let service: CreditMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LuckycoinTestModule],
                declarations: [CreditMySuffixComponent],
                providers: [
                    CreditMySuffixService
                ]
            })
            .overrideTemplate(CreditMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CreditMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CreditMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CreditMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.credits[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
