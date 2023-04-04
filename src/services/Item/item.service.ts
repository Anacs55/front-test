import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemDTO } from 'src/models/tasks/item';
import { BaseService } from '../base.service';

@Injectable({ providedIn: 'root' })
export class ItemService extends BaseService {
  constructor(
    private http: HttpClient,
  ) {
    super('/item')
  }

  create = (model: ItemDTO): Observable<void> => this.http.post<void>(this.baseUrl, { model });
  update = (model: ItemDTO): Observable<void> => this.http.put<void>(this.baseUrl, { model });
  updateItemsIndex = (project: string, column: string, model: string[]): Observable<void> => {
    return this.http.post<void>(`${this.baseUrl}/index/${project}/${column}`, { model });
  }
  deleteItem = (model: ItemDTO): Observable<boolean> => this.http.delete<boolean>(`${this.baseUrl}/${model.id}`)
}