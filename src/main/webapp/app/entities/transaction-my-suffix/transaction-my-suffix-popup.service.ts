import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TransactionMySuffix } from './transaction-my-suffix.model';
import { TransactionMySuffixService } from './transaction-my-suffix.service';
import {AnnouncementMySuffixService} from '../announcement-my-suffix';
import {AnnouncementMySuffix} from '../announcement-my-suffix/announcement-my-suffix.model';

@Injectable()
export class TransactionMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private transactionService: TransactionMySuffixService,
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
                        const transaction: TransactionMySuffix = new TransactionMySuffix();
                        transaction.announcement = announcementResponse.body;
                        this.ngbModalRef = this.transactionModalRef(component, transaction);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.transactionModalRef(component, new TransactionMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transactionModalRef(component: Component, transaction: TransactionMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transaction = transaction;
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
