import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TransactionMySuffix } from './transaction-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TransactionMySuffix>;

@Injectable()
export class TransactionMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/transactions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/transactions';

    constructor(private http: HttpClient) { }

    create(transaction: TransactionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(transaction);
        return this.http.post<TransactionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transaction: TransactionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(transaction);
        return this.http.put<TransactionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TransactionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TransactionMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransactionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TransactionMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TransactionMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransactionMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TransactionMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TransactionMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TransactionMySuffix[]>): HttpResponse<TransactionMySuffix[]> {
        const jsonResponse: TransactionMySuffix[] = res.body;
        const body: TransactionMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TransactionMySuffix.
     */
    private convertItemFromServer(transaction: TransactionMySuffix): TransactionMySuffix {
        const copy: TransactionMySuffix = Object.assign({}, transaction);
        return copy;
    }

    /**
     * Convert a TransactionMySuffix to a JSON which can be sent to the server.
     */
    private convert(transaction: TransactionMySuffix): TransactionMySuffix {
        const copy: TransactionMySuffix = Object.assign({}, transaction);
        return copy;
    }
}
