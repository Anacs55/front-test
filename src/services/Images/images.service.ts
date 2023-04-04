import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Image} from 'src/models/blog';
import BaseService from '../base.service';

@Injectable({providedIn: 'root'})
export default class ImagesService extends BaseService {
  constructor(private http: HttpClient) {
    super('/images')
  }

  post(image: File) {
    let data = new FormData();
    data.append('image', image);
    data.append('image', image, image.name);
    return this.http.post<Image>(`${this.baseUrl}`, data);
  }

  patch(image: File) {
    let data = new FormData();
    data.append('image', image);
    data.append('image', image, image.name);
    return this.http.patch<Image>(`${this.baseUrl}`, data);
  }
}