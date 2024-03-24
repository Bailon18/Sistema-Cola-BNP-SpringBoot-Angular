import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/helpers';
import { Atencion } from './atenciones';


@Injectable({
  providedIn: 'root'
})
export class AtencionesService {


  constructor(private http: HttpClient) { }

  guardarAtenciones(atencion: Atencion): Observable<Atencion> {
    return this.http.post<Atencion>(`${baseUrl}/atenciones/guardar`, atencion);
  }




}
