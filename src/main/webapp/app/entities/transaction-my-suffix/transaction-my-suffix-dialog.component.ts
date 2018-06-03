import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransactionMySuffix } from './transaction-my-suffix.model';
import { TransactionMySuffixPopupService } from './transaction-my-suffix-popup.service';
import { TransactionMySuffixService } from './transaction-my-suffix.service';
import { User, UserService } from '../../shared';
import { AnnouncementMySuffix, AnnouncementMySuffixService } from '../announcement-my-suffix';

@Component({
    selector: 'jhi-transaction-my-suffix-dialog',
    templateUrl: './transaction-my-suffix-dialog.component.html'
})
export class TransactionMySuffixDialogComponent implements OnInit {

    transaction: TransactionMySuffix;
    isSaving: boolean;

    users: User[];

    announcements: AnnouncementMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private transactionService: TransactionMySuffixService,
        private userService: UserService,
        private announcementService: AnnouncementMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.announcementService.query()
            .subscribe((res: HttpResponse<AnnouncementMySuffix[]>) => { this.announcements = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transaction.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transactionService.update(this.transaction));
        } else {
            this.subscribeToSaveResponse(
                this.transactionService.create(this.transaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TransactionMySuffix>>) {
        result.subscribe((res: HttpResponse<TransactionMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TransactionMySuffix) {
        this.eventManager.broadcast({ name: 'transactionListModification', content: 'OK'});
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

    trackAnnouncementById(index: number, item: AnnouncementMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-transaction-my-suffix-popup',
    template: ''
})
export class TransactionMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transactionPopupService: TransactionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transactionPopupService
                    .open(TransactionMySuffixDialogComponent as Component, params['id']);
            } else {
                this.transactionPopupService
                    .open(TransactionMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
