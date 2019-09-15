import { Component, OnInit } from '@angular/core';
import { dataTablePersonalizada } from '../../../fnAuxiliares/datatablePersonalizada';
import { Title } from '@angular/platform-browser';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'ipn-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  dtOptions: any;
  usuarios: any = [];
  mostrarTabla: boolean;
  constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService) {

    this.titleService.setTitle('Usuarios');

  }
  ngOnInit() {
    this.mostrarUsuarios();
  }

  async mostrarUsuarios() {
    await this.apiSisEvent.obtenerUsuarios().subscribe(
      res => {
        this.usuarios = res;
        this.dtOptions = dataTablePersonalizada.dtOptions();
        this.mostrarTabla = true;
      },
      err =>
        swal({
          title: "Error",
          text: "Por favor recarga la página.",
          icon: "error"
        })
    );
  }

  aceptarUsuario(id: string) {
    swal({
      title: "¿Estás seguro?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: false,
    })
      .then((aceptar) => {
        if (aceptar) {

          let usuario = new Usuario();
          usuario.id_usuario = id;

          this.apiSisEvent.existeUsuario(localStorage.getItem('id')).subscribe(
            res => {
              let respuesta: any = res;
              if (respuesta.errores.includes('No existe')) {
                this.apiSisEvent.salir();
              }
              else {
                this.apiSisEvent.aceptarUsuario(id, usuario).subscribe(
                  res => {
                    swal({
                      title: "Correcto",
                      icon: "success",
                      text: "Usuario registrado correctamente."
                    });
                    this.mostrarUsuarios();
                  },
                  err =>
                    swal({
                      title: "Error",
                      text: "Vuelve a intentarlo.",
                      icon: "error"
                    })
                );
              }
            },
            err => console.log("error")
          );
        }
      });
  }

  rechazarUsuario(id: string) {
    swal({
      title: "¿Estás seguro?",
      icon: "warning",
      buttons: ["Cancelar", "Rechazar"],
      dangerMode: true,
    })
      .then((rechazar) => {
        if (rechazar) {

          this.apiSisEvent.existeUsuario(localStorage.getItem('id')).subscribe(
            res => {
              let respuesta: any = res;
              if (respuesta.errores.includes('No existe')) {
                this.apiSisEvent.salir();
              }
              else {
                this.apiSisEvent.rechazarUsuario(id).subscribe(
                  res => {
                    swal({
                      title: "Correcto",
                      icon: "success",
                      text: "Usuario rechazado correctamente."
                    });
                    this.mostrarUsuarios();
                  },
                  err =>
                    swal({
                      title: "Error",
                      text: "Vuelve a intentarlo.",
                      icon: "error"
                    })
                );
              }
            },
            err => console.log("error")
          );
        }
      });
  }

  eliminarUsuario(id: string) {
    swal({
      title: "¿Estás seguro?",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
      .then((borrar) => {
        if (borrar) {

          this.apiSisEvent.existeUsuario(localStorage.getItem('id')).subscribe(
            res => {
              let respuesta: any = res;
              if (respuesta.errores.includes('No existe')) {
                this.apiSisEvent.salir();
              }
              else {
                this.apiSisEvent.eliminarUsuario(id).subscribe(
                  res => {
                    swal({
                      title: "Correcto",
                      icon: "success",
                      text: "Usuario eliminado correctamente."
                    });
                    this.mostrarUsuarios();
                  },
                  err =>
                    swal({
                      title: "Error",
                      text: "Vuelve a intentarlo.",
                      icon: "error"
                    })
                );
              }
            },
            err => console.log("error")
          );
        }
      });
  }
}
