/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LuckycoinTestModule } from '../../../test.module';
import { AnnouncementMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/announcement-my-suffix/announcement-my-suffix-delete-dialog.component';
import { AnnouncementMySuffixService } from '../../../../../../main/webapp/app/entities/announcement-my-suffix/announcement-my-suffix.service';

describe('Component Tests', () => {

    describe('AnnouncementMySuffix Management Delete Component', () => {
        let comp: AnnouncementMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AnnouncementMySuffixDeleteDialogComponent>;
        let service: AnnouncementMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LuckycoinTestModule],
                declarations: [AnnouncementMySuffixDeleteDialogComponent],
                providers: [
                    AnnouncementMySuffixService
                ]
            })
            .overrideTemplate(AnnouncementMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnnouncementMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnnouncementMySuffixService);
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
