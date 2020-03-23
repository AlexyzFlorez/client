import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Evento } from 'src/app/models/evento';
import { environment } from 'src/environments/environment';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fechas } from 'src/app/fnAuxiliares/fechas';
import { ErrorHelper } from 'src/app/fnAuxiliares/errorHelper';

@Component({
  selector: 'ipn-evento',
  templateUrl: './evento.component.html',
  styles: []
})
export class EventoComponent implements OnInit {
  evento;
  rutaArchivo = environment.URI_ARCHIVOS;
  fechas = new Fechas();
  errorHelper;
  tipoUsuario;
  tipoAdministrador=environment.TIPO_ADMINISTRADOR;

  constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService, private activeRoute: ActivatedRoute) {
    this.titleService.setTitle('Evento');
    this.tipoUsuario = localStorage.getItem('tipo_usuario');
    this.errorHelper = new ErrorHelper(this.router, this.apiSisEvent);
  }

  ngOnInit() {
    this.evento = new Evento();

    const idEvento = this.activeRoute.snapshot.params.id;
    this.apiSisEvent.obtenerDetallesEvento(idEvento).subscribe(
      res => {
        this.evento = res;
        this.evento.evidencias=[
          {
            url_evidencia:"2f67904b-bf2b-46cd-ba94-7221f50e0240.png",
            descripcion:"Descripcion de la primer evidencia"
          }
        ]
        this.evento.hora_inicio = this.fechas.darFormatoHora(this.evento.hora_inicio);
        this.evento.hora_termino = this.fechas.darFormatoHora(this.evento.hora_termino);
      },
      err => this.errorHelper.manejarError(err.status)
    );
    
  }

}
