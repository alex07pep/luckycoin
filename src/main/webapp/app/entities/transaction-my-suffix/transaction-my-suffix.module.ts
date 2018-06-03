import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LuckycoinSharedModule } from '../../shared';
import { LuckycoinAdminModule } from '../../admin/admin.module';
import {
    TransactionMySuffixService,
    TransactionMySuffixPopupService,
    TransactionMySuffixComponent,
    TransactionMySuffixDetailComponent,
    TransactionMySuffixDialogComponent,
    TransactionMySuffixPopupComponent,
    TransactionMySuffixDeletePopupComponent,
    TransactionMySuffixDeleteDialogComponent,
    transactionRoute,
    transactionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...transactionRoute,
    ...transactionPopupRoute,
];

@NgModule({
    imports: [
        LuckycoinSharedModule,
        LuckycoinAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransactionMySuffixComponent,
        TransactionMySuffixDetailComponent,
        TransactionMySuffixDialogComponent,
        TransactionMySuffixDeleteDialogComponent,
        TransactionMySuffixPopupComponent,
        TransactionMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TransactionMySuffixComponent,
        TransactionMySuffixDialogComponent,
        TransactionMySuffixPopupComponent,
        TransactionMySuffixDeleteDialogComponent,
        TransactionMySuffixDeletePopupComponent,
    ],
    providers: [
        TransactionMySuffixService,
        TransactionMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LuckycoinTransactionMySuffixModule {}
