import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CreditMySuffix } from './credit-my-suffix.model';
import { CreditMySuffixService } from './credit-my-suffix.service';

@Component({
    selector: 'jhi-credit-my-suffix-detail',
    templateUrl: './credit-my-suffix-detail.component.html'
})
export class CreditMySuffixDetailComponent implements OnInit, OnDestroy {

    credit: CreditMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private creditService: CreditMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCredits();
    }

    load(id) {
        this.creditService.find(id)
            .subscribe((creditResponse: HttpResponse<CreditMySuffix>) => {
                this.credit = creditResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCredits() {
        this.eventSubscriber = this.eventManager.subscribe(
            'creditListModification',
            (response) => this.load(this.credit.id)
        );
    }
}
