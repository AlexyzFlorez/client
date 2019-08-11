import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ApiSisEventService {
  API_URI = 'http://localhost:3000/api/sis-event';

  idUsuarioLogin:string;
  tipoUsuarioLogin:string;
  usuarioLogin:Usuario;
  tokenLogin:string;
  idProyectoLogin:string;

  constructor(private http: HttpClient, public router:Router) { 
    this.cargarStorage();
  }

  estaLogueado()
  {
    this.cargarStorage();
    return (this.tokenLogin.length>5) ? true : false;
  }

  cargarStorage()
  {
    if(localStorage.getItem('token'))
    {
      this.idUsuarioLogin=localStorage.getItem('id')
      this.tipoUsuarioLogin=localStorage.getItem('tipo')
      this.tokenLogin=localStorage.getItem('token');
      this.usuarioLogin=JSON.parse(localStorage.getItem('usuario'));
    }
    else
    {
      this.idUsuarioLogin="";
      this.tipoUsuarioLogin="";
      this.tokenLogin="";
      this.usuarioLogin=null;
    }
  }

  //USUARIO-----------------------------------------------------
  preregistrarUsuario(formulario)
  {
    return this.http.post(`${this.API_URI}/usuario/preregistrar-usuario`, formulario);
  }

  iniciarSesion(usuario: Usuario)
  {
    return this.http.post(`${this.API_URI}/usuario/iniciar-sesion`, usuario);
  }

  recuperarPassword(correo)
  {
    return this.http.post(`${this.API_URI}/usuario/recuperar-password`, correo);
  }

  //REGISTRO
  ObtenerDepartamentos()
  {
    return this.http.get(`${this.API_URI}/usuario/obtener-departamentos`);
  }

  salir()
  {
 
    this.idUsuarioLogin="";
    this.tipoUsuarioLogin="";
    this.tokenLogin="";
    this.usuarioLogin=null;

    localStorage.removeItem('id');
    localStorage.removeItem('tipo');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  
    this.router.navigate(['/login']);
  }
}

