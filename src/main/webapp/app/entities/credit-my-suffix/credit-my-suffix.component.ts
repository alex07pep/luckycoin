import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CreditMySuffix } from './credit-my-suffix.model';
import { CreditMySuffixService } from './credit-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-credit-my-suffix',
    templateUrl: './credit-my-suffix.component.html'
})
export class CreditMySuffixComponent implements OnInit, OnDestroy {
credits: CreditMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private creditService: CreditMySuffixService,
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
            this.creditService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<CreditMySuffix[]>) => this.credits = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.creditService.query().subscribe(
            (res: HttpResponse<CreditMySuffix[]>) => {
                this.credits = res.body;
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
        this.registerChangeInCredits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CreditMySuffix) {
        return item.id;
    }
    registerChangeInCredits() {
        this.eventSubscriber = this.eventManager.subscribe('creditListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
