import { BaseEntity, User } from './../../shared';

export const enum AnnouncementCategory {
    'PHONES',
    'AUTO',
    'ELECTRONICS',
    'OTHERS'
}

export const enum Location {
    'BUCURESTI',
    'ALBA',
    'ARAD',
    'ARGES',
    'BACAU',
    'BIHOR',
    'BISTRITA_NASAUD',
    'BOTOSANI',
    'BRASOV',
    'BRAILA',
    'BUZAU',
    'CARAS_SEVERIN',
    'CALARASI',
    'CLUJ',
    'CONSTANTA',
    'COVASNA',
    'DAMBOVITA',
    'DOLJ',
    'GALATI',
    'GIURGIU',
    'GORJ',
    'HARGHITA',
    'HUNEDOARA',
    'IALOMITA',
    'IASI',
    'ILFOV',
    'MARAMURES',
    'MEHEDINTI',
    'MURES',
    'NEAMT',
    'OLT',
    'PRAHOVA',
    'SATU_MARE',
    'SALAJ',
    'SIBIU',
    'SUCEAVA',
    'TELEORMAN',
    'TIMIS',
    'TULCEA',
    'VALCEA',
    'VASLUI',
    'VRANCEA'
}

export const enum Status {
    'OPEN',
    'CLOSED',
    'FINISED',
    'COMPLETED'
}

export class AnnouncementMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public category?: AnnouncementCategory,
        public description?: string,
        public photo1ContentType?: string,
        public photo1?: any,
        public photo2ContentType?: string,
        public photo2?: any,
        public photo3ContentType?: string,
        public photo3?: any,
        public photo4ContentType?: string,
        public photo4?: any,
        public addedDate?: any,
        public finishDate?: any,
        public phoneNumber?: string,
        public location?: Location,
        public price?: number,
        public minimPrice?: number,
        public ticketValue?: number,
        public status?: Status,
        public ticketsNumber?: number,
        public ticketsSold?: number,
        public owner?: User,
        public winner?: User,
        public transactions?: BaseEntity[],
    ) {
    }
}
