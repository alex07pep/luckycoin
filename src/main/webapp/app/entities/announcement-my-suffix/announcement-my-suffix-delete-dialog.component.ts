import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AnnouncementMySuffix } from './announcement-my-suffix.model';
import { AnnouncementMySuffixPopupService } from './announcement-my-suffix-popup.service';
import { AnnouncementMySuffixService } from './announcement-my-suffix.service';

@Component({
    selector: 'jhi-announcement-my-suffix-delete-dialog',
    templateUrl: './announcement-my-suffix-delete-dialog.component.html'
})
export class AnnouncementMySuffixDeleteDialogComponent {

    announcement: AnnouncementMySuffix;

    constructor(
        private announcementService: AnnouncementMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.announcementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'announcementListModification',
                content: 'Deleted an announcement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-announcement-my-suffix-delete-popup',
    template: ''
})
export class AnnouncementMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private announcementPopupService: AnnouncementMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.announcementPopupService
                .open(AnnouncementMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
