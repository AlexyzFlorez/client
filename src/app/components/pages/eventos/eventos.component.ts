import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fechas } from 'src/app/fnAuxiliares/fechas';
import { Evento } from 'src/app/models/evento';
import { environment } from '../../../../environments/environment';
import { ErrorHelper } from 'src/app/fnAuxiliares/errorHelper';

@Component({
  selector: 'ipn-eventos',
  templateUrl: './eventos.component.html',
  styles: []
})
export class EventosComponent implements OnInit {

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
    this.titleService.setTitle('Eventos');
  }

  ngOnInit() {
    this.tipoUsuario = localStorage.getItem("tipo_usuario");
    this.detallesEvento = new Evento();
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
    this.apiSisEvent.obtenerDetallesEvento(id).subscribe(
      res => {
        this.detallesEvento = res;
        this.detallesEvento.hora_inicio = this.fechas.darFormatoHora(this.detallesEvento.hora_inicio);
        this.detallesEvento.hora_termino = this.fechas.darFormatoHora(this.detallesEvento.hora_termino);
      },
      err => this.errorHelper.manejarError(err.status)
    );
  }
}
