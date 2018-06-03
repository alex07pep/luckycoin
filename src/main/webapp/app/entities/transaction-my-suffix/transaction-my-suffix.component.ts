import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransactionMySuffix } from './transaction-my-suffix.model';
import { TransactionMySuffixService } from './transaction-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-transaction-my-suffix',
    templateUrl: './transaction-my-suffix.component.html'
})
export class TransactionMySuffixComponent implements OnInit, OnDestroy {
transactions: TransactionMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private transactionService: TransactionMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.transactionService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<TransactionMySuffix[]>) => this.transactions = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.transactionService.query().subscribe(
            (res: HttpResponse<TransactionMySuffix[]>) => {
                this.transactions = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTransactions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TransactionMySuffix) {
        return item.id;
    }
    registerChangeInTransactions() {
        this.eventSubscriber = this.eventManager.subscribe('transactionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
