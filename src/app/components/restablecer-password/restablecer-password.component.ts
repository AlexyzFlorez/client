import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario';
import { Formulario } from 'src/app/fnAuxiliares/formulario';
import { ApiSisEventService } from 'src/app/services/api-sis-event.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { ErrorHelper } from 'src/app/fnAuxiliares/errorHelper';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'ipn-restablecer-password',
  templateUrl: './restablecer-password.component.html',
  styles: []
})
export class RestablecerPasswordComponent implements OnInit {

  usuario = new Usuario();
  miFormulario= new Formulario();
  respuesta:any={errores:[]};
  mostrarFormulario:boolean;
  errorHelper;

  constructor(private titleService: Title, private router: Router,private apiSisEvent: ApiSisEventService, private activeRoute: ActivatedRoute) {
    this.errorHelper = new ErrorHelper(this.router, this.apiSisEvent);
    this.titleService.setTitle('Restablecer contraseña');

    if(localStorage.getItem('token'))
    {
      this.router.navigate(['/calendario']);
    }
  }

  ngOnInit() {
    this.usuario.password="";
    this.usuario.password2="";

    this.apiSisEvent.validarCodigoPassword(this.activeRoute.snapshot.params.codigo).subscribe(
      res =>
      {
        this.respuesta=res;
 
        if(this.respuesta.errores.includes('Codigo incorrecto'))
        {
          this.router.navigate(['/calendario']);
        }
        else
        {
          this.mostrarFormulario=true;
        }
      },
      err => this.errorHelper.manejarError(err.status)
    );
  }

  restablecerPassword()
  {
    let password=this.usuario.password;
    let password2=this.usuario.password2;
    this.usuario.codigo_res_password=this.activeRoute.snapshot.params.codigo;
    
    //VALIDACIONES DE FORMULARIO

      //Password
      this.miFormulario.passwordVacia = this.miFormulario.validarCampoVacio(password);
      this.miFormulario.passwordFormato = this.miFormulario.validarFormatoPassword(password);

      //Password2
      this.miFormulario.password2Vacia = this.miFormulario.validarCampoVacio(password2);
      this.miFormulario.password2Formato = this.miFormulario.validarFormatoPassword(password2);

      this.miFormulario.passwordIguales=this.miFormulario.validarPasswordsIguales(password, password2);

      //Validamos los estados de campos generales,primero campos vacios
      if(!this.miFormulario.passwordVacia && !this.miFormulario.password2Vacia)
      {
        //Validamos formatos
        if(this.miFormulario.passwordFormato && this.miFormulario.password2Formato && this.miFormulario.passwordIguales)
        {
          this.apiSisEvent.restablecerPassword(this.usuario.codigo_res_password,this.usuario).subscribe(
            res =>
            {
              this.respuesta=res;

              if(this.respuesta.errores.includes('Codigo incorrecto'))
              {
                this.router.navigate(['/calendario']);
              }
              else if(this.respuesta.errores.includes('Ninguno'))
              {
                this.miFormulario.estado = 1;
                setTimeout(() => {
                  this.miFormulario.estado = 0;
                }, 1000);

                swal({
                  icon: "success",
                  text:"Contraseña restablecida"
                });
  
                this.router.navigate(['/login']);
              }
              else if(this.respuesta.errores.includes('Consultas'))
              {
                this.miFormulario.estado = 2;
    
                setTimeout(() => {
                this.miFormulario.estado = 0;
                }, 2000);
              }
            },
            err=>
            {
              this.miFormulario.estado = 2;
    
              setTimeout(() => {
                this.miFormulario.estado = 0;
              }, 2000);
 
             this.usuario.password="";
             this.usuario.password2="";

             this.errorHelper.manejarError(err.status)
              
            });
        }
        else
        {
          console.log("Formatos")
          console.log("Campos Invalidos");
        }
      }
      else
      {
        console.log("Campos Invalidos");
      }
  }

}