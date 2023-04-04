import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemActivityDTO } from 'src/models/activities/itemActivity';
import { BaseService } from '../base.service';

@Injectable({ providedIn: 'root' })

export class ActivityService extends BaseService {
  constructor(
    private http: HttpClient,
  ) {
    super('/itemActivity'); // TO-DO
  }
  getAllByItemId = (itemId: string): Observable<ItemActivityDTO[]> => this.http.get<ItemActivityDTO[]>(`${this.baseUrl}/${itemId}`);
  getAllNotification = (): Observable<ItemActivityDTO[]> => this.http.get<ItemActivityDTO[]>(`${this.baseUrl}/${"rsj3v63cHq7Vyi4jaE7fSVWG"}`);

  create = (model: ItemActivityDTO): Observable<void> => this.http.post<void>(this.baseUrl, { model });
  edit = (model: ItemActivityDTO): Observable<void> => this.http.put<void>(this.baseUrl, { model });
  delete = (model: ItemActivityDTO): Observable<void> => this.http.delete<void>(`${this.baseUrl}/${model.id}`);
}