import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LuckycoinTransactionMySuffixModule } from './transaction-my-suffix/transaction-my-suffix.module';
import { LuckycoinCreditMySuffixModule } from './credit-my-suffix/credit-my-suffix.module';
import { LuckycoinAnnouncementMySuffixModule } from './announcement-my-suffix/announcement-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        LuckycoinTransactionMySuffixModule,
        LuckycoinCreditMySuffixModule,
        LuckycoinAnnouncementMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LuckycoinEntityModule {}
