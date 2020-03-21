import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario';
import { Formulario } from 'src/app/fnAuxiliares/formulario';
import { ApiSisEventService } from 'src/app/services/api-sis-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { ErrorHelper } from '../../../fnAuxiliares/errorHelper';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'ipn-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  usuario = new Usuario();
  miFormulario = new Formulario();
  respuesta: any = { errores: [] }
  departamentos: any;
  errorHelper;

  constructor(private titleService: Title, private apiSisEvent: ApiSisEventService, private router: Router, private activeRoute: ActivatedRoute) {
    this.titleService.setTitle('Perfil');
    this.errorHelper = new ErrorHelper(this.router, this.apiSisEvent);
  }

  ngOnInit() {
    this.apiSisEvent.obtenerDepartamentos().subscribe(
      res => {
        this.departamentos = res;
      },
      err => this.errorHelper.manejarError(err.status)

    );
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    const params = this.activeRoute.snapshot.params;
    const idUsuario = params.id;

    this.apiSisEvent.existeUsuario(localStorage.getItem('_id')).subscribe(
      res => {
        let respuesta: any = res;
        if (respuesta.errores.includes('No existe')) {
          this.apiSisEvent.salir();
        }
        else {
          this.apiSisEvent.obtenerPerfil(idUsuario).subscribe(
            res => {
              this.usuario = res[0];
              this.usuario.password = "";
              this.usuario.password2 = "";
            },
            err => this.errorHelper.manejarError(err.status)
          );
        }
      },
      err => this.errorHelper.manejarError(err.status)
    );
  }

  actualizarPerfil() {
    const params = this.activeRoute.snapshot.params;
    let nombre = this.usuario.nombre;
    let apellidoPaterno = this.usuario.apellido_paterno;
    let apellidoMaterno = this.usuario.apellido_materno;
    let telefono = this.usuario.telefono;
    let numEmpleado = this.usuario.num_empleado;
    let departamento = this.usuario.departamento;
    let correo = this.usuario.correo;
    let password = this.usuario.password;
    let password2 = this.usuario.password2;

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

    this.miFormulario.passwordIguales = this.miFormulario.validarPasswordsIguales(password, password2);

    if (this.usuario.departamento.nombre == "Departamento" || this.usuario.departamento.nombre == "") {
      this.miFormulario.departamentoVacio = true;
    }

    //Validamos los estados de campos generales,primero campos vacios
    if (!this.miFormulario.nombreVacio && !this.miFormulario.apellidoPaternoVacio && !this.miFormulario.apellidoMaternoVacio && !this.miFormulario.telefonoVacio && !this.miFormulario.numEmpleadoVacio && !this.miFormulario.telefonoVacio && !this.miFormulario.departamentoVacio && !this.miFormulario.correoVacio && !this.miFormulario.passwordVacia && !this.miFormulario.password2Vacia) {
      //Validamos formatos
      if (this.miFormulario.nombreFormato && this.miFormulario.apellidoPaternoFormato && this.miFormulario.apellidoMaternoFormato && this.miFormulario.telefonoFormato && this.miFormulario.correoFormato && this.miFormulario.passwordFormato && this.miFormulario.password2Formato && this.miFormulario.passwordIguales) {
        this.apiSisEvent.existeUsuario(localStorage.getItem('_id')).subscribe(
          res => {
            let respuesta: any = res;
            if (respuesta.errores.includes('No existe')) {
              this.apiSisEvent.salir();
            }
            else {
              this.apiSisEvent.actualizarPerfil(params.id, this.usuario).subscribe(
                res => {
                  this.respuesta = res;

                  if (this.respuesta.errores.includes('Ninguno')) {
                    this.miFormulario.estado = 1;
                    setTimeout(() => {
                      this.miFormulario.estado = 0;
                    }, 1000);

                    const usuarioActualizado = new Usuario();
                    usuarioActualizado._id = params.id;
                    usuarioActualizado.correo = this.usuario.correo;
                    usuarioActualizado.tipo_usuario = localStorage.getItem('tipo_usuario')

                    localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
                    this.usuario.password = "";
                    this.usuario.password2 = "";

                    swal({
                      title: "Correcto",
                      icon: "success",
                      text: "Perfil actualizado correctamente."
                    });

                  }
                  else if (this.respuesta.errores.includes('Consultas')) {
                    this.miFormulario.estado = 2;

                    setTimeout(() => {
                      this.miFormulario.estado = 0;
                    }, 2000);

                    swal({
                      title: "Error",
                      text: "Vuelve a intentarlo.",
                      icon: "error"
                    })
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
                  this.miFormulario.estado = 2;

                  setTimeout(() => {
                    this.miFormulario.estado = 0;
                  }, 2000);

                 this.errorHelper.manejarError(err.status)
                });
            }
          },
          err => this.errorHelper.manejarError(err.status)
        );
      }
      else {
        //console.log("Campos Invalidos");
      }
    }
    else {
      //console.log("Campos Invalidos");
    }
  }
}
