import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario';
import { Formulario } from 'src/app/fnAuxiliares/formulario';
import { Router } from '@angular/router';
import { ApiSisEventService } from 'src/app/services/api-sis-event.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { ErrorHelper } from 'src/app/fnAuxiliares/errorHelper';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'ipn-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  usuario = new Usuario();
  miFormulario = new Formulario();
  respuesta: any = { errores: [] };
  departamentos: any;
  errorHelper;

  constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService) {
    this.errorHelper = new ErrorHelper(this.router, this.apiSisEvent);
    this.titleService.setTitle('Crear cuenta');

    if (localStorage.getItem('token')) {
      //Si ya inicio sesion de redirege
      if (localStorage.getItem('tipo_usuario')) {
        this.router.navigate(['/calendario']);
      }
    }
  }

  ngOnInit() {
    this.usuario.num_empleado = "";
    this.usuario.telefono = "";
    this.usuario.password = "";
    this.usuario.password2 = "";
    this.usuario.departamento.nombre = "Departamento";

    this.apiSisEvent.obtenerDepartamentos().subscribe(
      res => {
        this.departamentos = res;
      },
      err => this.errorHelper.manejarError(err.status)
    );
  }

  registrarUsuario() {
    let nombre = this.usuario.nombre;
    let apellidoPaterno = this.usuario.apellido_paterno;
    let apellidoMaterno = this.usuario.apellido_materno;
    let telefono = this.usuario.telefono;
    let numEmpleado = this.usuario.num_empleado;
    let correo = this.usuario.correo;
    let password = this.usuario.password;
    let password2 = this.usuario.password2;
    this.usuario.estado_registro = "Pre registrado";

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
    this.miFormulario.departamentoVacio = this.miFormulario.validarCampoVacio(this.usuario.departamento.nombre);

    //Correo
    this.miFormulario.correoVacio = this.miFormulario.validarCampoVacio(correo);
    this.miFormulario.correoFormato = this.miFormulario.validarFormatoCorreo(correo);

    //Password
    this.miFormulario.passwordVacia = this.miFormulario.validarCampoVacio(password);
    this.miFormulario.passwordFormato = this.miFormulario.validarFormatoPassword(password);

    //Password2
    this.miFormulario.password2Vacia = this.miFormulario.validarCampoVacio(password2);
    this.miFormulario.password2Formato = this.miFormulario.validarFormatoPassword(password2);

    this.miFormulario.passwordIguales = this.miFormulario.validarPasswordsIguales(password, password2);

    if (this.usuario.departamento.nombre == "Departamento") {
      this.miFormulario.departamentoVacio = true;
    }

    //Validamos los estados de campos generales,primero campos vacios
    if (!this.miFormulario.nombreVacio && !this.miFormulario.apellidoPaternoVacio && !this.miFormulario.apellidoMaternoVacio && !this.miFormulario.telefonoVacio && !this.miFormulario.numEmpleadoVacio && !this.miFormulario.telefonoVacio && !this.miFormulario.departamentoVacio && !this.miFormulario.correoVacio && !this.miFormulario.passwordVacia && !this.miFormulario.password2Vacia) {
      //Validamos formatos
      if (this.miFormulario.nombreFormato && this.miFormulario.apellidoPaternoFormato && this.miFormulario.apellidoMaternoFormato && this.miFormulario.telefonoFormato && this.miFormulario.numEmpleadoFormato && this.miFormulario.correoFormato && this.miFormulario.passwordFormato && this.miFormulario.password2Formato && this.miFormulario.passwordIguales) {
        
        this.apiSisEvent.preregistrarUsuario(this.usuario).subscribe(
          res => {
            this.respuesta = res;

            if (this.respuesta.errores.includes('Ninguno')) {
              this.miFormulario.estado = 1;
              setTimeout(() => {
                this.miFormulario.estado = 0;
              }, 1000);

              this.usuario.nombre = "";
              this.usuario.apellido_paterno = "";
              this.usuario.apellido_materno = "";
              this.usuario.telefono = "";
              this.usuario.departamento.nombre = "";
              this.usuario.num_empleado = "";
              this.usuario.correo = "";
              this.usuario.password = "";
              this.usuario.password2 = "";
              
              swal({
                icon: "success",
                title: "Correcto",
                text: "Pre registro exitoso."
              });
      
              this.router.navigate(['/login']);

            }
            else if (this.respuesta.errores.includes('Consultas')) {
              this.miFormulario.estado = 2;

              setTimeout(() => {
                this.miFormulario.estado = 0;
              }, 2000);

              swal({
                icon: "error",
                title: "Error",
                text: "Error, vuelve a intentarlo."
              });
            }
            else {
              //Checar los errores del servidor y mostrarlos
              if (this.respuesta.errores.includes('Usuario registrado') && !this.miFormulario.correoVacio) {
                this.miFormulario.usuarioRegistrado = true;
                setTimeout(() => {
                  this.miFormulario.usuarioRegistrado = undefined;
                }, 2000);
              }

              if (this.respuesta.errores.includes('Num empleado registrado')) {
                this.miFormulario.numEmpleadoRegistrado = true;
                setTimeout(() => {
                  this.miFormulario.numEmpleadoRegistrado = undefined;
                }, 2000);
              }
            }
          },
          err => {
            //console.log('Errores en el servidor');
            this.miFormulario.estado = 2;

            setTimeout(() => {
              this.miFormulario.estado = 0;
            }, 2000);

            this.errorHelper.manejarError(err.status)

          });
      }
      else {
        //console.log("Formatos")
        // console.log("Campos Invalidos");
      }
    }
    else {
      //console.log("Campos Invalidos");
    }
  }
}
