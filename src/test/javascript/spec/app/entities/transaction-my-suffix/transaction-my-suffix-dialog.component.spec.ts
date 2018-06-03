/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LuckycoinTestModule } from '../../../test.module';
import { TransactionMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/transaction-my-suffix/transaction-my-suffix-dialog.component';
import { TransactionMySuffixService } from '../../../../../../main/webapp/app/entities/transaction-my-suffix/transaction-my-suffix.service';
import { TransactionMySuffix } from '../../../../../../main/webapp/app/entities/transaction-my-suffix/transaction-my-suffix.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { AnnouncementMySuffixService } from '../../../../../../main/webapp/app/entities/announcement-my-suffix';

describe('Component Tests', () => {

    describe('TransactionMySuffix Management Dialog Component', () => {
        let comp: TransactionMySuffixDialogComponent;
        let fixture: ComponentFixture<TransactionMySuffixDialogComponent>;
        let service: TransactionMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LuckycoinTestModule],
                declarations: [TransactionMySuffixDialogComponent],
                providers: [
                    UserService,
                    AnnouncementMySuffixService,
                    TransactionMySuffixService
                ]
            })
            .overrideTemplate(TransactionMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransactionMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.transaction = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transactionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransactionMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.transaction = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transactionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
