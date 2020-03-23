import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fechas } from 'src/app/fnAuxiliares/fechas';
import { Evento } from 'src/app/models/evento';
import { environment } from '../../../../environments/environment';
import { ErrorHelper } from 'src/app/fnAuxiliares/errorHelper';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'ipn-eventos-memoria',
  templateUrl: './eventos-memoria.component.html',
  styles: []
})
export class EventosMemoriaComponent implements OnInit {


  nombreActividad: any;
  eventos: any;
  rutaArchivo = environment.URI_ARCHIVOS;
  filtroEventos;
  fechas = new Fechas();
  detallesEvento;
  mostrarTodo: boolean;
  tipoUsuario: string;
  idUsuario: string;
  eventosVacios: boolean;
  errorHelper;
  tipoAdministrador=environment.TIPO_ADMINISTRADOR;
  tipoEditor=environment.TIPO_EDITOR;
  
  constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService, private activeRoute: ActivatedRoute) {
    this.errorHelper = new ErrorHelper(this.router, this.apiSisEvent);
    this.titleService.setTitle('Eventos en memoria');
  }

  ngOnInit() {
    this.tipoUsuario = localStorage.getItem("tipo_usuario");
    this.detallesEvento = new Evento();
    this.idUsuario = localStorage.getItem("_id");

    this.obtenerEventosEnMemoria();
  }

  obtenerEventosEnMemoria() {
    this.apiSisEvent.obtenerEventosEnMemoria().subscribe(
      res => {
        this.eventos = res;
        console.log(this.eventos)
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
                    this.obtenerEventosEnMemoria();
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
