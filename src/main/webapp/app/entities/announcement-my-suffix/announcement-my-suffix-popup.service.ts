import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AnnouncementMySuffix } from './announcement-my-suffix.model';
import { AnnouncementMySuffixService } from './announcement-my-suffix.service';

@Injectable()
export class AnnouncementMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private announcementService: AnnouncementMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.announcementService.find(id)
                    .subscribe((announcementResponse: HttpResponse<AnnouncementMySuffix>) => {
                        const announcement: AnnouncementMySuffix = announcementResponse.body;
                        if (announcement.addedDate) {
                            announcement.addedDate = {
                                year: announcement.addedDate.getFullYear(),
                                month: announcement.addedDate.getMonth() + 1,
                                day: announcement.addedDate.getDate()
                            };
                        }
                        if (announcement.finishDate) {
                            announcement.finishDate = {
                                year: announcement.finishDate.getFullYear(),
                                month: announcement.finishDate.getMonth() + 1,
                                day: announcement.finishDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.announcementModalRef(component, announcement);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.announcementModalRef(component, new AnnouncementMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    announcementModalRef(component: Component, announcement: AnnouncementMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.announcement = announcement;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
