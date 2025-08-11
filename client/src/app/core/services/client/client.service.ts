import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/services/http-service/http-client.service';
import { IClient } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly endpoint = 'api/clients';

  constructor(private http: HttpClientService) { }

  getAll(query?: string) {

    let endpoint = this.endpoint;

    if (query) {
      endpoint += '?query=' + query;
    }

    return this.http.get<IClient[]>(this.endpoint);
  }

  getById(id: number) {
    return this.http.get<IClient>(`${this.endpoint}/${id}`);
  }

  create(client: Partial<IClient>) {
    return this.http.post<IClient>(this.endpoint, client);
  }

  update(id: number, client: Partial<IClient>) {
    return this.http.put<IClient>(`${this.endpoint}/${id}`, client);
  }

  delete(id: number) {
    return this.http.delete<IClient>(`${this.endpoint}/${id}`);
  }
}
