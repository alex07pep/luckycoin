/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LuckycoinTestModule } from '../../../test.module';
import { TransactionMySuffixComponent } from '../../../../../../main/webapp/app/entities/transaction-my-suffix/transaction-my-suffix.component';
import { TransactionMySuffixService } from '../../../../../../main/webapp/app/entities/transaction-my-suffix/transaction-my-suffix.service';
import { TransactionMySuffix } from '../../../../../../main/webapp/app/entities/transaction-my-suffix/transaction-my-suffix.model';

describe('Component Tests', () => {

    describe('TransactionMySuffix Management Component', () => {
        let comp: TransactionMySuffixComponent;
        let fixture: ComponentFixture<TransactionMySuffixComponent>;
        let service: TransactionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LuckycoinTestModule],
                declarations: [TransactionMySuffixComponent],
                providers: [
                    TransactionMySuffixService
                ]
            })
            .overrideTemplate(TransactionMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TransactionMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.transactions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
