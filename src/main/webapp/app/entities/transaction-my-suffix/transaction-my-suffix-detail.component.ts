import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionMySuffix } from './transaction-my-suffix.model';
import { TransactionMySuffixService } from './transaction-my-suffix.service';

@Component({
    selector: 'jhi-transaction-my-suffix-detail',
    templateUrl: './transaction-my-suffix-detail.component.html'
})
export class TransactionMySuffixDetailComponent implements OnInit, OnDestroy {

    transaction: TransactionMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private transactionService: TransactionMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTransactions();
    }

    load(id) {
        this.transactionService.find(id)
            .subscribe((transactionResponse: HttpResponse<TransactionMySuffix>) => {
                this.transaction = transactionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTransactions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'transactionListModification',
            (response) => this.load(this.transaction.id)
        );
    }
}
