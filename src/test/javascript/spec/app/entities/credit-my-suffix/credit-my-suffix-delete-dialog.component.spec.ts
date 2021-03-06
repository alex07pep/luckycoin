/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LuckycoinTestModule } from '../../../test.module';
import { CreditMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/credit-my-suffix/credit-my-suffix-delete-dialog.component';
import { CreditMySuffixService } from '../../../../../../main/webapp/app/entities/credit-my-suffix/credit-my-suffix.service';

describe('Component Tests', () => {

    describe('CreditMySuffix Management Delete Component', () => {
        let comp: CreditMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CreditMySuffixDeleteDialogComponent>;
        let service: CreditMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LuckycoinTestModule],
                declarations: [CreditMySuffixDeleteDialogComponent],
                providers: [
                    CreditMySuffixService
                ]
            })
            .overrideTemplate(CreditMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CreditMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CreditMySuffixService);
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
