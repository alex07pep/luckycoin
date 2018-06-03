import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AnnouncementMySuffixComponent } from './announcement-my-suffix.component';
import { AnnouncementMySuffixDetailComponent } from './announcement-my-suffix-detail.component';
import { AnnouncementMySuffixPopupComponent } from './announcement-my-suffix-dialog.component';
import { AnnouncementMySuffixDeletePopupComponent } from './announcement-my-suffix-delete-dialog.component';

@Injectable()
export class AnnouncementMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const announcementRoute: Routes = [
    {
        path: 'announcement-my-suffix',
        component: AnnouncementMySuffixComponent,
        resolve: {
            'pagingParams': AnnouncementMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.announcement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'announcement-my-suffix/:id',
        component: AnnouncementMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.announcement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const announcementPopupRoute: Routes = [
    {
        path: 'announcement-my-suffix-new',
        component: AnnouncementMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.announcement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'announcement-my-suffix/:id/edit',
        component: AnnouncementMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.announcement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'announcement-my-suffix/:id/delete',
        component: AnnouncementMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'luckycoinApp.announcement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
