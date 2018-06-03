/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LuckycoinTestModule } from '../../../test.module';
import { TransactionMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/transaction-my-suffix/transaction-my-suffix-delete-dialog.component';
import { TransactionMySuffixService } from '../../../../../../main/webapp/app/entities/transaction-my-suffix/transaction-my-suffix.service';

describe('Component Tests', () => {

    describe('TransactionMySuffix Management Delete Component', () => {
        let comp: TransactionMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TransactionMySuffixDeleteDialogComponent>;
        let service: TransactionMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LuckycoinTestModule],
                declarations: [TransactionMySuffixDeleteDialogComponent],
                providers: [
                    TransactionMySuffixService
                ]
            })
            .overrideTemplate(TransactionMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
