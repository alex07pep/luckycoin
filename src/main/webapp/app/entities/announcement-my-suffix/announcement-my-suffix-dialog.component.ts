import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { AnnouncementMySuffix } from './announcement-my-suffix.model';
import { AnnouncementMySuffixPopupService } from './announcement-my-suffix-popup.service';
import { AnnouncementMySuffixService } from './announcement-my-suffix.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-announcement-my-suffix-dialog',
    templateUrl: './announcement-my-suffix-dialog.component.html'
})
export class AnnouncementMySuffixDialogComponent implements OnInit {

    announcement: AnnouncementMySuffix;
    isSaving: boolean;

    users: User[];
    addedDateDp: any;
    finishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private announcementService: AnnouncementMySuffixService,
        private userService: UserService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.announcement, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.announcement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.announcementService.update(this.announcement));
        } else {
            this.subscribeToSaveResponse(
                this.announcementService.create(this.announcement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AnnouncementMySuffix>>) {
        result.subscribe((res: HttpResponse<AnnouncementMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AnnouncementMySuffix) {
        this.eventManager.broadcast({ name: 'announcementListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-announcement-my-suffix-popup',
    template: ''
})
export class AnnouncementMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private announcementPopupService: AnnouncementMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.announcementPopupService
                    .open(AnnouncementMySuffixDialogComponent as Component, params['id']);
            } else {
                this.announcementPopupService
                    .open(AnnouncementMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
