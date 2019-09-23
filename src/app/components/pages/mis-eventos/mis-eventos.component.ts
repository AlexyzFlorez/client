import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VariablesGlobales } from 'src/app/models/VariablesGlobales';
import { Fechas } from 'src/app/models/Fechas';
import { Evento } from 'src/app/models/Evento';

@Component({
  selector: 'ipn-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styles: []
})

export class MisEventosComponent implements OnInit {

    nombreActividad: any;
    eventos: any;
    rutaArchivo = VariablesGlobales.rutaArchivo;
    filtroEventos;
    fechas = new Fechas();
    detallesEvento;
    mostrarTodo:boolean;
    idUsuario:string;
    eventosVacios:boolean;
    tipoUsuario:string;
    
    constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService, private activeRoute: ActivatedRoute) {
      this.titleService.setTitle('Mis eventos');
    }
  
    ngOnInit() {
      this.detallesEvento = new Evento();
      this.idUsuario=localStorage.getItem("id")
      this.tipoUsuario=localStorage.getItem("tipo");
      this.obtenerMisEventos(this.idUsuario);
  
    }
  
    obtenerMisEventos(idUsuario) {
      this.apiSisEvent.obtenerMisEventos(idUsuario).subscribe(
        res => {
          this.eventos = res;
      
          for (let i = 0; i < this.eventos.length; i++) {
            this.eventos[i].fecha_inicio = this.fechas.darFormato(this.eventos[i].fecha_inicio);
            this.eventos[i].fecha_termino = this.fechas.darFormato(this.eventos[i].fecha_termino);
  
          }

          if(this.eventos.length<1 || this.eventos.length==undefined)
          {
            this.eventosVacios=true;
          }
          else
          {
            this.eventosVacios=false;
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
  