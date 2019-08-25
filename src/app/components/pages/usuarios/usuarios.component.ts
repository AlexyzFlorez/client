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
        this.mostrarTabla=true;
        
      },
      err => console.log("error")
    );
  
  }

  aceptarUsuario(id:string)
  {
    swal({
      title: "¿Estás seguro?",
      text: "Esta acción es permanente",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: false,
    })
      .then((aceptar) => {
        if (aceptar) {

          let usuario=new Usuario();
          usuario.id_usuario=id;

          this.apiSisEvent.aceptarUsuario(id,usuario).subscribe(
            res => {
              swal("Usuario registrado correctamente.", {
                icon: "success",
              });
              this.mostrarUsuarios();
            },
            err => console.log("error")
          );
        }
      });
  }

  rechazarUsuario(id:string)
  {
    swal({
      title: "¿Estás seguro?",
      text: "Esta acción es permanente",
      icon: "warning",
      buttons: ["Cancelar", "Rechazar"],
      dangerMode: true,
    })
      .then((rechazar) => {
        if (rechazar) {

          this.apiSisEvent.rechazarUsuario(id).subscribe(
            res => {
              swal("Usuario rechazado correctamente.", {
                icon: "success",
              });
              this.mostrarUsuarios();
            },
            err => console.log("error")
          );
        }
      });
  }

  eliminarUsuario(id:string)
  {
    swal({
      title: "¿Estás seguro?",
      text: "Esta acción es permanente",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
      .then((borrar) => {
        if (borrar) {

          this.apiSisEvent.eliminarUsuario(id).subscribe(
            res => {
              swal("Usuario Eliminado correctamente.", {
                icon: "success",
              });
              this.mostrarUsuarios();
            },
            err => console.log("error")
          );
        }
      });
  }
}
