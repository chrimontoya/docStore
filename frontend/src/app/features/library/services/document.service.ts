import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.es';
import {Observable} from 'rxjs';

@Service()
export class DocumentService {
  http: HttpClient = inject(HttpClient);
  baseUrl: string = `${environment.apiUrl}/documents`;

  find(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`);
  }

  uploadFiles(files: any[], metadata?: any): Observable<any>{
    const formData = new FormData();
    files.forEach(file => {
      formData.append('data', file, file.name);
    });
    formData.append('title', 'testing');
    formData.append('description', 'testing');
    return this.http.post<any>(`${this.baseUrl}`, formData, {responseType: 'blob',});
  }


}
