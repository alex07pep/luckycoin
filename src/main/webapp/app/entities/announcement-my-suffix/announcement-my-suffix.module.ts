import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LuckycoinSharedModule } from '../../shared';
import { LuckycoinAdminModule } from '../../admin/admin.module';
import {
    AnnouncementMySuffixService,
    AnnouncementMySuffixPopupService,
    AnnouncementMySuffixComponent,
    AnnouncementMySuffixDetailComponent,
    AnnouncementMySuffixDialogComponent,
    AnnouncementMySuffixPopupComponent,
    AnnouncementMySuffixDeletePopupComponent,
    AnnouncementMySuffixDeleteDialogComponent,
    announcementRoute,
    announcementPopupRoute,
    AnnouncementMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...announcementRoute,
    ...announcementPopupRoute,
];

@NgModule({
    imports: [
        LuckycoinSharedModule,
        LuckycoinAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AnnouncementMySuffixComponent,
        AnnouncementMySuffixDetailComponent,
        AnnouncementMySuffixDialogComponent,
        AnnouncementMySuffixDeleteDialogComponent,
        AnnouncementMySuffixPopupComponent,
        AnnouncementMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AnnouncementMySuffixComponent,
        AnnouncementMySuffixDialogComponent,
        AnnouncementMySuffixPopupComponent,
        AnnouncementMySuffixDeleteDialogComponent,
        AnnouncementMySuffixDeletePopupComponent,
    ],
    providers: [
        AnnouncementMySuffixService,
        AnnouncementMySuffixPopupService,
        AnnouncementMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LuckycoinAnnouncementMySuffixModule {}
