import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

interface IHttpRequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  reportProgress?: boolean;
  responseType?: 'json' | 'blob';
  withCredentials?: boolean;
  context?: HttpContext;
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, options?: any): Observable<T> {
    return this.http.get<T>(url, options as Record<string, any>);
  }

  post<T>(url: string, data?: any, options?: IHttpRequestOptions): Observable<T> {
    return this.http.post<T>(url, data, {
      ...options,
      responseType: (options?.responseType || 'json') as any
    });
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
