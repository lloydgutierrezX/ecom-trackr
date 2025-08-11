import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';
import { environment } from '../../../../environments/environment';

describe('ApiPrefixInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiPrefixInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prepend baseUrl to relative request', () => {
    http.get('clients').subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/clients`);
    expect(req.request.url).toBe(`${environment.apiBaseUrl}/clients`);
    expect(req.request.method).toBe('GET');
  });

  it('should not modify absolute URLs', () => {
    const fullUrl = 'https://external-api.com/data';

    http.get(fullUrl).subscribe();

    const req = httpMock.expectOne(fullUrl);
    expect(req.request.url).toBe(fullUrl);
    expect(req.request.method).toBe('GET');
  });
});