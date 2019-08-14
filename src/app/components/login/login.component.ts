import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/Usuario';
import { Formulario } from 'src/app/models/Formulario';
import { ApiSisEventService } from '../../services/api-sis-event.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ipn-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();
  usuarioR = new Usuario();
  miFormularioRecuperarPassword = new Formulario();
  miFormulario= new Formulario();
  respuesta:any={errores:[]}

  constructor(private titleService: Title, private router: Router,private apiSisEventService: ApiSisEventService) {
    this.titleService.setTitle('Iniciar sesión');

    if(localStorage.getItem('token'))
    {
      this.router.navigate(['/calendario']);
    }
  }

  ngOnInit() {
    this.usuario.password="";
  }

  iniciarSesion()
  {
    console.log("Entra")
    let correo=this.usuario.correo;
    let password=this.usuario.password;

    //Correo
    this.miFormulario.correoVacio = this.miFormulario.validarCampoVacio(correo);
    this.miFormulario.correoFormato = this.miFormulario.validarFormatoCorreo(correo);

    //Password
    this.miFormulario.passwordVacia = this.miFormulario.validarCampoVacio(password);
    this.miFormulario.passwordFormato = this.miFormulario.validarFormatoPassword(password);

    if(!this.miFormulario.correoVacio && !this.miFormulario.passwordVacia && this.miFormulario.correoFormato && this.miFormulario.passwordFormato)
    {
      console.log("Campos Validos")

      let formData=new FormData();
      formData.append('correo',this.usuario.correo);
      formData.append('password',this.usuario.password);

      this.apiSisEventService.iniciarSesion(this.usuario).subscribe(
        res =>
        {
          this.respuesta=res;

          if(this.respuesta.errores.includes('Usuario no registrado') && !this.miFormulario.correoVacio)
          {
            this.miFormulario.correoRegistrado = false;

            setTimeout(() => {
              this.miFormulario.correoRegistrado = true;
            }, 2000);
          }

          if(this.respuesta.errores.includes('Password incorrecta') && !this.miFormulario.passwordVacia)
          {
            this.miFormulario.passwordIguales = false;
            setTimeout(() => {
              this.miFormulario.passwordIguales = true;
            }, 2000);
          }

          if(this.respuesta.errores.includes('Ninguno'))
          {
            this.usuario.correo="";
            this.usuario.password="";

            let tipoUsuarioLogin=JSON.stringify(this.respuesta.usuarioToken.tipo).replace(/["']/g, "");

            localStorage.setItem('id',JSON.stringify(this.respuesta.usuarioToken.id_usuario).replace(/["']/g, ""));
            localStorage.setItem('tipo',JSON.stringify(this.respuesta.usuarioToken.tipo).replace(/["']/g, ""));
            localStorage.setItem('token',this.respuesta.token);
            localStorage.setItem('usuario',JSON.stringify(this.respuesta.usuarioToken));

            this.apiSisEventService.cargarStorage();

            this.router.navigate(['/calendario']);
          }
        },
        err => console.log("error")
      );
    }
    else
    {
      console.log("Campos Invalidos")
    }
  }
//------------------------------------------------------------------------
  recuperarPassword(formulario: NgForm)
  {
    let usuarioRecuperar=new Usuario();
    let correo = formulario.controls.correoR.value;
    usuarioRecuperar.correo=correo;

    this.miFormularioRecuperarPassword.correoVacio = this.miFormularioRecuperarPassword.validarCampoVacio(correo);
    this.miFormularioRecuperarPassword.correoFormato = this.miFormularioRecuperarPassword.validarFormatoCorreo(correo);

    if(!this.miFormularioRecuperarPassword.correoVacio && this.miFormularioRecuperarPassword.correoFormato )
    {
      console.log('Validacion de inputs correcta');

      this.apiSisEventService.recuperarPassword(usuarioRecuperar).subscribe(
        res =>
        {
          this.respuesta=res;
    
          if(this.respuesta.errores.includes('Correo no registrado') && !this.miFormularioRecuperarPassword.correoVacio)
          {
            this.miFormularioRecuperarPassword.correoRegistrado = true;
            setTimeout(() => {
              this.miFormularioRecuperarPassword.correoRegistrado = false;
            }, 2000);
          }
      
          if(this.respuesta.errores.includes('Ninguno'))
          {
            this.miFormularioRecuperarPassword.estado = 1;
            setTimeout(() => {
              this.miFormularioRecuperarPassword.estado = 0;
            }, 2000);

            correo = "";
            formulario.resetForm();
          }
        },
        err => console.log("error")
      );
    }
    else
    {
      console.log('Validacion de inputs incorrecta');
    }
  }
}