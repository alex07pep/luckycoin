import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CreditMySuffix } from './credit-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CreditMySuffix>;

@Injectable()
export class CreditMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/credits';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/credits';

    constructor(private http: HttpClient) { }

    create(credit: CreditMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(credit);
        return this.http.post<CreditMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(credit: CreditMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(credit);
        return this.http.put<CreditMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CreditMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CreditMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CreditMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CreditMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CreditMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CreditMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CreditMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CreditMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CreditMySuffix[]>): HttpResponse<CreditMySuffix[]> {
        const jsonResponse: CreditMySuffix[] = res.body;
        const body: CreditMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CreditMySuffix.
     */
    private convertItemFromServer(credit: CreditMySuffix): CreditMySuffix {
        const copy: CreditMySuffix = Object.assign({}, credit);
        return copy;
    }

    /**
     * Convert a CreditMySuffix to a JSON which can be sent to the server.
     */
    private convert(credit: CreditMySuffix): CreditMySuffix {
        const copy: CreditMySuffix = Object.assign({}, credit);
        return copy;
    }
}
