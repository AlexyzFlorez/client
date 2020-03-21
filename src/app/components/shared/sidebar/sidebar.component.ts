import { Component, OnInit, Input } from '@angular/core';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ErrorHelper } from 'src/app/fnAuxiliares/errorHelper';

@Component({
  selector: 'ipn-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  tipoUsuario: String;
  token: String = "Ninguno";
  actividades: any;
  mostrarContadores: boolean = true;
  banderaMostrarSalir: boolean;
  tipoAdministrador = environment.TIPO_ADMINISTRADOR;
  errorHelper;

  constructor(private router: Router, private apiSisEvent: ApiSisEventService) {
    this.errorHelper = new ErrorHelper(this.router, this.apiSisEvent);
    this.tipoUsuario = localStorage.getItem('tipo_usuario');
    this.token = localStorage.getItem('token');

    if (this.token) {
      this.banderaMostrarSalir = true;
    }
    else {
      this.banderaMostrarSalir = false;
    }
  }

  ngOnInit() {
    this.apiSisEvent.obtenerNumeroEventos().subscribe(
      res => {
        this.actividades = res;
      },
      err => this.errorHelper.manejarError(err.status)
    );
  }

  mostrarEventos() {

    if (this.mostrarContadores == true) {
      this.mostrarContadores = false;
    }
    else {
      this.mostrarContadores = true;
    }
  }

}
