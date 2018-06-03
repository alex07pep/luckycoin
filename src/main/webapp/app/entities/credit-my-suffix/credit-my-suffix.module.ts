import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LuckycoinSharedModule } from '../../shared';
import { LuckycoinAdminModule } from '../../admin/admin.module';
import {
    CreditMySuffixService,
    CreditMySuffixPopupService,
    CreditMySuffixComponent,
    CreditMySuffixDetailComponent,
    CreditMySuffixDialogComponent,
    CreditMySuffixPopupComponent,
    CreditMySuffixDeletePopupComponent,
    CreditMySuffixDeleteDialogComponent,
    creditRoute,
    creditPopupRoute,
} from './';

const ENTITY_STATES = [
    ...creditRoute,
    ...creditPopupRoute,
];

@NgModule({
    imports: [
        LuckycoinSharedModule,
        LuckycoinAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CreditMySuffixComponent,
        CreditMySuffixDetailComponent,
        CreditMySuffixDialogComponent,
        CreditMySuffixDeleteDialogComponent,
        CreditMySuffixPopupComponent,
        CreditMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CreditMySuffixComponent,
        CreditMySuffixDialogComponent,
        CreditMySuffixPopupComponent,
        CreditMySuffixDeleteDialogComponent,
        CreditMySuffixDeletePopupComponent,
    ],
    providers: [
        CreditMySuffixService,
        CreditMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LuckycoinCreditMySuffixModule {}
