import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/Usuario';
import { Formulario } from 'src/app/models/Formulario';
import { ApiSisEventService } from 'src/app/services/api-sis-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'ipn-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  usuario=new Usuario();
  miFormulario = new Formulario();
  respuesta:any={errores:[]}
  departamentos:any;

  constructor(private titleService: Title,private apiSisEvent: ApiSisEventService, private router: Router, private activeRoute: ActivatedRoute) {
    this.titleService.setTitle('Perfil');
  }

  ngOnInit() {
    this.apiSisEvent.obtenerDepartamentos().subscribe(
      res =>
      {
          this.departamentos=res;
      },
      err => console.log("error")
    );
    this.obtenerUsuario();
  }

  obtenerUsuario()
  {
    const params=this.activeRoute.snapshot.params;

    this.apiSisEvent.obtenerPerfil(params.id).subscribe(
      res =>
      {
          this.usuario=res[0];
          console.log(this.usuario)
          this.usuario.password="";
          this.usuario.password2="";
      },
      err => console.log("error")
    );
  }


  actualizarPerfil()
  {
    const params=this.activeRoute.snapshot.params;
    let nombre=this.usuario.nombre;
    let apellidoPaterno=this.usuario.apellido_paterno;
    let apellidoMaterno=this.usuario.apellido_materno;
    let telefono=this.usuario.telefono;
    let numEmpleado=this.usuario.num_empleado;
    let departamento=this.usuario.departamento;
    let correo=this.usuario.correo;
    let password=this.usuario.password;
    let password2=this.usuario.password2;
    
    //VALIDACIONES DE FORMULARIO

      //Nombre
      this.miFormulario.nombreVacio = this.miFormulario.validarCampoVacio(nombre);
      this.miFormulario.nombreFormato = this.miFormulario.validarFormatoNombre(nombre);

      //Apellido paterno
      this.miFormulario.apellidoPaternoVacio = this.miFormulario.validarCampoVacio(apellidoPaterno);
      this.miFormulario.apellidoPaternoFormato = this.miFormulario.validarFormatoNombre(apellidoPaterno);

      //Apellido paterno
      this.miFormulario.apellidoMaternoVacio = this.miFormulario.validarCampoVacio(apellidoMaterno);
      this.miFormulario.apellidoMaternoFormato = this.miFormulario.validarFormatoNombre(apellidoMaterno);
      
      //Telefono
      this.miFormulario.telefonoVacio = this.miFormulario.validarCampoVacio(telefono);
      this.miFormulario.telefonoFormato = this.miFormulario.validarFormatoTelefono(telefono);

      //Num Empleado
      this.miFormulario.numEmpleadoVacio = this.miFormulario.validarCampoVacio(numEmpleado);
      this.miFormulario.numEmpleadoFormato = this.miFormulario.validarFormatoNumEmpleado(numEmpleado);

      //Departamento
      this.miFormulario.departamentoVacio = this.miFormulario.validarCampoVacio(departamento);

      //Correo
      this.miFormulario.correoVacio = this.miFormulario.validarCampoVacio(correo);
      this.miFormulario.correoFormato = this.miFormulario.validarFormatoCorreo(correo);

      //Password
      this.miFormulario.passwordVacia = this.miFormulario.validarCampoVacio(password);
      this.miFormulario.passwordFormato = this.miFormulario.validarFormatoPassword(password);

      //Password2
      this.miFormulario.password2Vacia = this.miFormulario.validarCampoVacio(password2);
      this.miFormulario.password2Formato = this.miFormulario.validarFormatoPassword(password2);

      this.miFormulario.passwordIguales=this.miFormulario.validarPasswordsIguales(password, password2);

      if(this.usuario.departamento=="Departamento")
      {
          this.miFormulario.departamentoVacio=true;
      }

      //Validamos los estados de campos generales,primero campos vacios
      if( !this.miFormulario.nombreVacio && !this.miFormulario.apellidoPaternoVacio && !this.miFormulario.apellidoMaternoVacio && !this.miFormulario.telefonoVacio && !this.miFormulario.numEmpleadoVacio && !this.miFormulario.telefonoVacio && !this.miFormulario.departamentoVacio && !this.miFormulario.correoVacio && !this.miFormulario.passwordVacia && !this.miFormulario.password2Vacia)
      {
        //Validamos formatos
        if(this.miFormulario.nombreFormato && this.miFormulario.apellidoPaternoFormato && this.miFormulario.apellidoMaternoFormato && this.miFormulario.telefonoFormato && this.miFormulario.correoFormato && this.miFormulario.passwordFormato && this.miFormulario.password2Formato && this.miFormulario.passwordIguales)
        {
          console.log(this.usuario)
          this.apiSisEvent.actualizarPerfil(params.id,this.usuario).subscribe(
            res =>
            {
              this.respuesta=res;
              //Checar los errores del servidor y mostrarlos
    
              if(this.respuesta.errores.includes('Usuario registrado') && !this.miFormulario.correoVacio)
              {
                this.miFormulario.usuarioRegistrado = true;
                setTimeout(() => {
                  this.miFormulario.usuarioRegistrado = undefined;
                  }, 2000);
              }
    
              if(this.respuesta.errores.includes('Num empleado registrado'))
              {
                this.miFormulario.numEmpleadoRegistrado = true;
                setTimeout(() => {
                  this.miFormulario.numEmpleadoRegistrado = undefined;
                  }, 2000);
              }

              if(this.respuesta.errores.includes('No existe'))
              {
                this.router.navigate(['/login']);
              }
         
              if(this.respuesta.errores.includes('Ninguno'))
              {
                this.miFormulario.estado = 1;
                setTimeout(() => {
                  this.miFormulario.estado = 0;
                }, 1000);
  
                const usuarioActualizado=new Usuario();
                usuarioActualizado.id_usuario=params.id;
                usuarioActualizado.correo=this.usuario.correo;
                usuarioActualizado.tipo=localStorage.getItem('tipo')

                localStorage.setItem('usuario',JSON.stringify(usuarioActualizado));
                this.usuario.password="";
                this.usuario.password2="";

                swal({
                  icon: "success",
                  text:"Perfil actualizado correctamente"
                });
    
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
              console.log('Errores en el servidor');
              this.miFormulario.estado = 2;
    
              setTimeout(() => {
                this.miFormulario.estado = 0;
              }, 2000);
            });
        }
        else
        {
          console.log("Campos Invalidos");
        }
      }
      else
      {
        console.log("Campos Invalidos");
      }
  }
}
