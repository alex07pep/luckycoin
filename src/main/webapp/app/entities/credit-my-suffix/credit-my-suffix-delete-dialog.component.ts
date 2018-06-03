import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CreditMySuffix } from './credit-my-suffix.model';
import { CreditMySuffixPopupService } from './credit-my-suffix-popup.service';
import { CreditMySuffixService } from './credit-my-suffix.service';

@Component({
    selector: 'jhi-credit-my-suffix-delete-dialog',
    templateUrl: './credit-my-suffix-delete-dialog.component.html'
})
export class CreditMySuffixDeleteDialogComponent {

    credit: CreditMySuffix;

    constructor(
        private creditService: CreditMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.creditService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'creditListModification',
                content: 'Deleted an credit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-credit-my-suffix-delete-popup',
    template: ''
})
export class CreditMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private creditPopupService: CreditMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.creditPopupService
                .open(CreditMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
