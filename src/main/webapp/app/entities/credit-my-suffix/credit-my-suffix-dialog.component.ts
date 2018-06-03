import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CreditMySuffix } from './credit-my-suffix.model';
import { CreditMySuffixPopupService } from './credit-my-suffix-popup.service';
import { CreditMySuffixService } from './credit-my-suffix.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-credit-my-suffix-dialog',
    templateUrl: './credit-my-suffix-dialog.component.html'
})
export class CreditMySuffixDialogComponent implements OnInit {

    credit: CreditMySuffix;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private creditService: CreditMySuffixService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.credit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.creditService.update(this.credit));
        } else {
            this.subscribeToSaveResponse(
                this.creditService.create(this.credit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CreditMySuffix>>) {
        result.subscribe((res: HttpResponse<CreditMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CreditMySuffix) {
        this.eventManager.broadcast({ name: 'creditListModification', content: 'OK'});
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
    selector: 'jhi-credit-my-suffix-popup',
    template: ''
})
export class CreditMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private creditPopupService: CreditMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.creditPopupService
                    .open(CreditMySuffixDialogComponent as Component, params['id']);
            } else {
                this.creditPopupService
                    .open(CreditMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
