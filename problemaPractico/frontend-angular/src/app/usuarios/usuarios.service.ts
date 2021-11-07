import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface Usuario {
    Id: number;
    Nombre: string;
    Email: string;
}

export interface CompararUsuarios {
    EmailA: string;
    EmailB: string;
}

@Injectable()
export class UsuarioService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
    getTodosLosUsuarios() {
        return this.http.post(environment.api,{
            operationName: "obtenerTodosLosUsuarios",
            query: `query obtenerTodosLosUsuarios {
                obtenerTodosLosUsuarios{
                  Id
                  Nombre
                  Email
                }
            }`,
            variables: {}
        });
    }

    setUsuarioData(usuario: Usuario) {
        return this.http.post(environment.api,{
            operationName: "modificarUsuario",
            query: `mutation modificarUsuario {
                modificarUsuario(input: {
                  Id: ${usuario.Id},
                  Nombre: "${usuario.Nombre}",
                  Email: "${usuario.Email}"
                }){
                  Id
                  Nombre
                  Email
                }
            }`,
            variables: {}
        });
    }

    setNuevoUsuario(usuario: Usuario) {
        return this.http.post(environment.api,{
            operationName: "crearUsuario",
            query: `mutation crearUsuario {
                crearUsuario(input: {
                  Nombre: "${usuario.Nombre}",
                  Email: "${usuario.Email}"
                }){
                  Id
                  Nombre
                  Email
                }
              }`,
            variables: {}
        });
    }

    compararUsuarios(usuarios: CompararUsuarios) {
        return this.http.post(environment.api,{
            operationName: "compararHistoricoGananciasPerdidasCarteraUsuarioAB",
            query: `query compararHistoricoGananciasPerdidasCarteraUsuarioAB {
                compararHistoricoGananciasPerdidasCarteraUsuarioAB(emailUsuarioA: "${usuarios.EmailA}", emailUsuarioB: "${usuarios.EmailB}"){
                    Email
                    Resultado
                }
            }`,
            variables: {}
        });
    }
}