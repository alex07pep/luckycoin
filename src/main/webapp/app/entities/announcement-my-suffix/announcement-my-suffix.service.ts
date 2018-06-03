import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AnnouncementMySuffix } from './announcement-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AnnouncementMySuffix>;

@Injectable()
export class AnnouncementMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/announcements';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/announcements';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(announcement: AnnouncementMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(announcement);
        return this.http.post<AnnouncementMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(announcement: AnnouncementMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(announcement);
        return this.http.put<AnnouncementMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AnnouncementMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AnnouncementMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<AnnouncementMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AnnouncementMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<AnnouncementMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<AnnouncementMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AnnouncementMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AnnouncementMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AnnouncementMySuffix[]>): HttpResponse<AnnouncementMySuffix[]> {
        const jsonResponse: AnnouncementMySuffix[] = res.body;
        const body: AnnouncementMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AnnouncementMySuffix.
     */
    private convertItemFromServer(announcement: AnnouncementMySuffix): AnnouncementMySuffix {
        const copy: AnnouncementMySuffix = Object.assign({}, announcement);
        copy.addedDate = this.dateUtils
            .convertLocalDateFromServer(announcement.addedDate);
        copy.finishDate = this.dateUtils
            .convertLocalDateFromServer(announcement.finishDate);
        return copy;
    }

    /**
     * Convert a AnnouncementMySuffix to a JSON which can be sent to the server.
     */
    private convert(announcement: AnnouncementMySuffix): AnnouncementMySuffix {
        const copy: AnnouncementMySuffix = Object.assign({}, announcement);
        copy.addedDate = this.dateUtils
            .convertLocalDateToServer(announcement.addedDate);
        copy.finishDate = this.dateUtils
            .convertLocalDateToServer(announcement.finishDate);
        return copy;
    }
}
