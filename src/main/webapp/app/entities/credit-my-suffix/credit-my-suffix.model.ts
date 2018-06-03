import { BaseEntity, User } from './../../shared';

export class CreditMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public creditValue?: number,
        public user?: User,
    ) {
    }
}
