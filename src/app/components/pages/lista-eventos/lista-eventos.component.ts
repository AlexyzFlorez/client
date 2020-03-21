import { Component, OnInit } from '@angular/core';
import { dataTablePersonalizada } from '../../../fnAuxiliares/datatablePersonalizada';
import { Title } from '@angular/platform-browser';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { ErrorHelper } from 'src/app/fnAuxiliares/errorHelper';
import { environment } from '../../../../environments/environment';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'ipn-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styles: []
})
export class ListaEventosComponent implements OnInit {

  dtOptions: any;
  eventos: any = [];
  mostrarTabla: boolean;
  errorHelper;
  tipoAdministrador = environment.TIPO_ADMINISTRADOR;
  tipoUsuario: string;
  idUsuario: string;
  
  constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService) {
    this.errorHelper = new ErrorHelper(this.router, this.apiSisEvent);
    this.titleService.setTitle('Eventos');
  }

  ngOnInit() {
    this.tipoUsuario = localStorage.getItem("tipo_usuario");
    this.idUsuario = localStorage.getItem("_id");
    this.mostrarEventos();
  }

  async mostrarEventos() {
    await this.apiSisEvent.obtenerEventos('7c3d4ab1-38e6-4406-87b5-ecee274e3f5b').subscribe(
      res => {
        this.eventos = res;
        this.dtOptions = dataTablePersonalizada.dtOptions();
        this.mostrarTabla = true;
      },
      err => this.errorHelper.manejarError(err.status)
    );
  }

  agregarAMemoria(id) {
    console.log("Agregar", id)
  }

  eliminarEvento(id) {
    console.log("Eliminar", id)
  }
}
