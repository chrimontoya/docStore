import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {TokenUserDTO} from '../dtos/token-user.dto';

@Service()
export class AuthService {
  private baseURL = environment.apiUrl;
  http: HttpClient = inject(HttpClient);

  setToken(token: string) {
    sessionStorage.setItem('accessToken', token);
  }

  removeToken() {
    sessionStorage.removeItem('accessToken');
  }

  getToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  login(username: string, password: string): Observable<TokenUserDTO> {
    return this.http.post<TokenUserDTO>(`${this.baseURL}/auth/login`, {username, password});
  }


}
