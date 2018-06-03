import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CreditMySuffixComponent } from './credit-my-suffix.component';
import { CreditMySuffixDetailComponent } from './credit-my-suffix-detail.component';
import { CreditMySuffixPopupComponent } from './credit-my-suffix-dialog.component';
import { CreditMySuffixDeletePopupComponent } from './credit-my-suffix-delete-dialog.component';

export const creditRoute: Routes = [
    {
        path: 'credit-my-suffix',
        component: CreditMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.credit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'credit-my-suffix/:id',
        component: CreditMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.credit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const creditPopupRoute: Routes = [
    {
        path: 'credit-my-suffix-new',
        component: CreditMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.credit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'credit-my-suffix/:id/edit',
        component: CreditMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.credit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'credit-my-suffix/:id/delete',
        component: CreditMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.credit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
