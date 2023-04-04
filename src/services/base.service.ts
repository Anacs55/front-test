import { HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { environment } from 'src/environments/environment';

export class BaseService {
  readonly baseApi: string
  readonly baseUrl: string

  constructor(@Inject('baseEndpoint') baseEndpoint: string) {
    this.baseApi = environment.apiUrl
    this.baseUrl = environment.apiUrl + baseEndpoint
  }

  toForm(object: any): FormData {
    const form = new FormData();
    Object.keys(object).forEach(key => {
      let value = object[key];
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      form.append(key, value)
    });
    return form
  }

  toParams(object: any): HttpParams {
    let params = new HttpParams();
    Object.keys(object).forEach(key => {
      params = params.set(key, object[key])
    });
    return params;
  }
}
