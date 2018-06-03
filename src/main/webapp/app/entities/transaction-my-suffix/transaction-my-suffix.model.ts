import { BaseEntity, User } from './../../shared';

export class TransactionMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public completed?: boolean,
        public user?: User,
        public announcement?: BaseEntity,
    ) {
        this.completed = false;
    }
}
