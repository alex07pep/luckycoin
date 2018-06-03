import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TransactionMySuffixComponent } from './transaction-my-suffix.component';
import { TransactionMySuffixDetailComponent } from './transaction-my-suffix-detail.component';
import { TransactionMySuffixPopupComponent } from './transaction-my-suffix-dialog.component';
import { TransactionMySuffixDeletePopupComponent } from './transaction-my-suffix-delete-dialog.component';

export const transactionRoute: Routes = [
    {
        path: 'transaction-my-suffix',
        component: TransactionMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'transaction-my-suffix/:id',
        component: TransactionMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionPopupRoute: Routes = [
    {
        path: 'transaction-my-suffix-new',
        component: TransactionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-my-suffix/:id/edit',
        component: TransactionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-my-suffix/:id/delete',
        component: TransactionMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.transaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
