import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fechas } from 'src/app/models/Fechas';
import { Evento } from 'src/app/models/Evento';
import { environment } from '../../../../environments/environment';

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

  constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService, private activeRoute: ActivatedRoute) {

    this.titleService.setTitle('Eventos');
  }

  ngOnInit() {
    this.tipoUsuario = localStorage.getItem("tipo");
    this.detallesEvento = new Evento();
    this.idUsuario = localStorage.getItem("id");

    const params = this.activeRoute.snapshot.params;

    if (params.id == "7c3d4ab1-38e6-4406-87b5-ecee274e3f5b") {
      this.nombreActividad = "Todos"
    }
    else {
      this.apiSisEvent.obtenerNombreActividad(params.id).subscribe(
        res => {
          this.nombreActividad = res;
        },
        err => console.log("error")
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
      err => console.log("error")
    );
  }

  verDetalles(id) {
    this.apiSisEvent.obtenerDetallesEvento(id).subscribe(
      res => {
        this.detallesEvento = res;
        this.detallesEvento.hora_inicio = this.fechas.darFormatoHora(this.detallesEvento.hora_inicio);
        this.detallesEvento.hora_termino = this.fechas.darFormatoHora(this.detallesEvento.hora_termino);
      },
      err => console.log("error")
    );
  }
}
