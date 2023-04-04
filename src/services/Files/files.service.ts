import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from '../base.service';

@Injectable({providedIn: 'root'})
export class FilesService extends BaseService {
  constructor(private http: HttpClient) {
    super('/images');
  }

  postImages = (model: File): Observable<any> => {
    const formData = new FormData();
    formData.append('file', model);
    return this.http.post<any>(this.baseUrl, formData);
  }
}
