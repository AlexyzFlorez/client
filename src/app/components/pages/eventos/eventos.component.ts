import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fechas } from 'src/app/fnAuxiliares/fechas';
import { environment } from '../../../../environments/environment';
import { ErrorHelper } from 'src/app/fnAuxiliares/errorHelper';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'ipn-eventos',
  templateUrl: './eventos.component.html',
  styles: []
})
export class EventosComponent implements OnInit {

  nombreActividad: any;
  eventos: any=[];
  rutaArchivo = environment.URI_ARCHIVOS;
  filtroEventos;
  fechas = new Fechas();
  mostrarTodo: boolean;
  tipoUsuario: string;
  idUsuario: string;
  eventosVacios: boolean;
  errorHelper;
  tipoAdministrador=environment.TIPO_ADMINISTRADOR;
  tipoEditor=environment.TIPO_EDITOR;
  
  constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService, private activeRoute: ActivatedRoute) {
    this.errorHelper = new ErrorHelper(this.router, this.apiSisEvent);
    this.titleService.setTitle('Eventos');
  }

  ngOnInit() {
    this.tipoUsuario = localStorage.getItem("tipo_usuario");

    this.idUsuario = localStorage.getItem("_id");

    const params = this.activeRoute.snapshot.params;

    if (params.id == "7c3d4ab1-38e6-4406-87b5-ecee274e3f5b") {
      this.nombreActividad = "Todos"
    }
    else {
      this.apiSisEvent.obtenerNombreActividad(params.id).subscribe(
        res => {
          this.nombreActividad = res;
        },
        err => this.errorHelper.manejarError(err.status)
      );
    }

    this.obtenerEventos(params.id);
  }

  obtenerEventos(idActividad) {
    this.apiSisEvent.obtenerEventos(idActividad).subscribe(
      res => {
        this.eventos = res;
        for (let i = 0; i < this.eventos.length; i++) {
          this.eventos[i].fecha_inicio = this.fechas.darFormato(this.eventos[i].fecha_inicio);
          this.eventos[i].fecha_termino = this.fechas.darFormato(this.eventos[i].fecha_termino);
        }

        if (this.eventos.length < 1 || this.eventos.length == undefined) {
          this.eventosVacios = true;
        }
        else {
          this.eventosVacios = false;
        }
      },
      err => this.errorHelper.manejarError(err.status)
    );
  }

  verDetalles(id) {
    this.router.navigate([`/evento/${id}`]);
  }

  aceptarMemoria(id){
    swal({
      title: "¿Estás seguro?",
      icon: "warning",
      buttons: ["Cancelar", "Agregar"],
      dangerMode: false,
    })
      .then((borrar) => {
        if (borrar) {

          this.apiSisEvent.existeUsuario(localStorage.getItem('_id')).subscribe(
            res => {
              let respuesta: any = res;
              if (respuesta.errores.includes('No existe')) {
                this.apiSisEvent.salir();
              }
              else {
                let actualizacion={
                  en_memoria:true
                }
                this.apiSisEvent.actualizarMemoria(id, actualizacion).subscribe(
                  res => {
                    swal({
                      title: "Correcto",
                      icon: "success",
                      text: "Evento agregado correctamente."
                    });
                    const params = this.activeRoute.snapshot.params;
                    this.obtenerEventos(params.id);
                  },
                  err => this.errorHelper.manejarError(err.status)
                );
              }
            },
            err => this.errorHelper.manejarError(err.status)
          );
        }
      });
  }

  descartarMemoria(id){
    swal({
      title: "¿Estás seguro?",
      icon: "warning",
      buttons: ["Cancelar", "Descartar"],
      dangerMode: false,
    })
      .then((borrar) => {
        if (borrar) {

          this.apiSisEvent.existeUsuario(localStorage.getItem('_id')).subscribe(
            res => {
              let respuesta: any = res;
              if (respuesta.errores.includes('No existe')) {
                this.apiSisEvent.salir();
              }
              else {
                let actualizacion={
                  en_memoria:false
                }
                this.apiSisEvent.actualizarMemoria(id, actualizacion).subscribe(
                  res => {
                    swal({
                      title: "Correcto",
                      icon: "success",
                      text: "Evento descartado correctamente."
                    });
                    const params = this.activeRoute.snapshot.params;
                    this.obtenerEventos(params.id);
                  },
                  err => this.errorHelper.manejarError(err.status)
                );
              }
            },
            err => this.errorHelper.manejarError(err.status)
          );
        }
      });
  }

  editarEvento(id) {
    this.router.navigate([`/editar-evento/${id}`]);
  }

  eliminarEvento(id: string) {
    swal({
      title: "¿Estás seguro?",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
      .then((borrar) => {
        if (borrar) {

          this.apiSisEvent.existeUsuario(localStorage.getItem('_id')).subscribe(
            res => {
              let respuesta: any = res;
              if (respuesta.errores.includes('No existe')) {
                this.apiSisEvent.salir();
              }
              else {
                this.apiSisEvent.eliminarEvento(id).subscribe(
                  res => {
                    swal({
                      title: "Correcto",
                      icon: "success",
                      text: "Evento eliminado correctamente."
                    });
                    const params = this.activeRoute.snapshot.params;
                    this.obtenerEventos(params.id);
                  },
                  err => this.errorHelper.manejarError(err.status)
                );
              }
            },
            err => this.errorHelper.manejarError(err.status)
          );
        }
      });
  }
}
