import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserCoopcycle } from 'app/shared/model/user-coopcycle.model';

type EntityResponseType = HttpResponse<IUserCoopcycle>;
type EntityArrayResponseType = HttpResponse<IUserCoopcycle[]>;

@Injectable({ providedIn: 'root' })
export class UserCoopcycleService {
  public resourceUrl = SERVER_API_URL + 'api/user-coopcycles';

  constructor(protected http: HttpClient) {}

  create(userCoopcycle: IUserCoopcycle): Observable<EntityResponseType> {
    return this.http.post<IUserCoopcycle>(this.resourceUrl, userCoopcycle, { observe: 'response' });
  }

  update(userCoopcycle: IUserCoopcycle): Observable<EntityResponseType> {
    return this.http.put<IUserCoopcycle>(this.resourceUrl, userCoopcycle, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserCoopcycle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserCoopcycle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
