import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/usuario';
import baseUrl from 'src/app/helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }


  getUsuarios(): Observable<User[]>{
    return this.http.get<User[]>(`${baseUrl}/api/usuarios`);
  }

  buscarUsuario(id:number): Observable<User>{
    return this.http.get<User>(`${baseUrl}/api/usuarios/${id}`);
  }

  guardarUsuarioServi(usuario: User):Observable<User>{
    return this.http.post<User>(`${baseUrl}/auth/register`, usuario, {headers: this.httpHeaders});
  }

  cambiarEstado(id: number, estado: boolean): Observable<any> {
    return this.http.post(`${baseUrl}/api/usuarios/cambiar-estado/${id}/${estado}`, {});
  }

  validarcorreo(correo: string): Observable<boolean>{
    return this.http.get<boolean>(`${baseUrl}/api/usuarios/existe-correo?correoElectronico=${correo}`);
  }



}
