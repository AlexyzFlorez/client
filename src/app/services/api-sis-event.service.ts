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

  //ADMINISTRADOR--------------------------------------------
  obtenerUsuarios()
  {
    return this.http.get(`${this.API_URI}/administrador/obtener-usuarios?token=${this.tokenLogin}`);
  }

  aceptarUsuario(id:string,usuario)
  {
    return this.http.put(`${this.API_URI}/administrador/aceptar-usuario/${id}?token=${this.tokenLogin}`,usuario);
  }

  rechazarUsuario(id:string)
  {
    return this.http.delete(`${this.API_URI}/administrador/rechazar-usuario/${id}?token=${this.tokenLogin}`);
  }

  eliminarUsuario(id:string)
  {
    return this.http.delete(`${this.API_URI}/administrador/eliminar-usuario/${id}?token=${this.tokenLogin}`);
  }

  //EDITOR-----------------------------------------------------
  preregistrarUsuario(formulario)
  {
    return this.http.post(`${this.API_URI}/editor/preregistrar-usuario`, formulario);
  }

  iniciarSesion(usuario: Usuario)
  {
    return this.http.post(`${this.API_URI}/editor/iniciar-sesion`, usuario);
  }

  recuperarPassword(correo)
  {
    return this.http.post(`${this.API_URI}/editor/recuperar-password`, correo);
  }

  restablecerPassword(codigo:string, usuario)
  {
    return this.http.put(`${this.API_URI}/editor/restablecer-password/${codigo}`,usuario);
  }

  validarCodigoPassword(codigo)
  {
    return this.http.get(`${this.API_URI}/editor/validar-codigo-password/${codigo}`);
  }

  obtenerDepartamentos()
  {
    return this.http.get(`${this.API_URI}/editor/obtener-departamentos?token=${this.tokenLogin}`);
  }

  obtenerActividades()
  {
    return this.http.get(`${this.API_URI}/editor/obtener-actividades?token=${this.tokenLogin}`);
  }

  obtenerCategorias()
  {
    return this.http.get(`${this.API_URI}/editor/obtener-categorias?token=${this.tokenLogin}`);
  }

  registrarEvento(evento: any)
  {
    return this.http.post(`${this.API_URI}/editor/registrar-evento?token=${this.tokenLogin}`, evento);
  }

  obtenerPerfil(id:string)
  {
    return this.http.get(`${this.API_URI}/editor/obtener-perfil/${id}?token=${this.tokenLogin}`);
  }

  actualizarPerfil(id:string,usuario)
  {
    return this.http.put(`${this.API_URI}/editor/actualizar-perfil/${id}?token=${this.tokenLogin}`, usuario);
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

  //USUARIO
}

