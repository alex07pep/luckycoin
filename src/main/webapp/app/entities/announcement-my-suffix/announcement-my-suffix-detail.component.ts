import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { AnnouncementMySuffix } from './announcement-my-suffix.model';
import { AnnouncementMySuffixService } from './announcement-my-suffix.service';
import {Account, Principal} from '../../shared';

@Component({
    selector: 'jhi-announcement-my-suffix-detail',
    templateUrl: './announcement-my-suffix-detail.component.html'
})
export class AnnouncementMySuffixDetailComponent implements OnInit, OnDestroy {

    announcement: AnnouncementMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    account: Account;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private principal: Principal,
        private announcementService: AnnouncementMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAnnouncements();
        this.principal.identity().then((account) => {
            this.account = account;
        });
    }

    load(id) {
        this.announcementService.find(id)
            .subscribe((announcementResponse: HttpResponse<AnnouncementMySuffix>) => {
                this.announcement = announcementResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAnnouncements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'announcementListModification',
            (response) => this.load(this.announcement.id)
        );
    }

    acceptProduct() {

    }

    declineProduct() {

    }
}
