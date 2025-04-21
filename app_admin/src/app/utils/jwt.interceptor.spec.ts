import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthenticationService } from '../services/authentication.service';

describe('JwtInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let mockAuthService: Partial<AuthenticationService>;

  beforeEach(() => {
    mockAuthService = {
      isLoggedIn: () => true,
      getToken: () => 'fake-jwt-token'
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an Authorization header if user is logged in', () => {
    httpClient.get('/api/trips').subscribe();

    const httpRequest = httpMock.expectOne('/api/trips');
    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer fake-jwt-token');
  });

  it('should skip Authorization header for login/register endpoints', () => {
    httpClient.post('login', {}).subscribe();
    const httpRequest = httpMock.expectOne('login');
    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
  });
});
