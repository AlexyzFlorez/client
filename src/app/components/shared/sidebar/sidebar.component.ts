import { Component, OnInit, Input } from '@angular/core';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ipn-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  tipoUsuario: String;
  token: String = "Ninguno";
  eventos: any;
  mostrarContadores: boolean = true;
  banderaMostrarSalir:boolean;
  tipoAdministrador=environment.TIPO_ADMINISTRADOR;

  constructor(private router: Router, private apiSisEvent: ApiSisEventService) {
    this.tipoUsuario = localStorage.getItem('tipo');
    this.token = localStorage.getItem('token');

    if(this.token){
      this.banderaMostrarSalir=true;
    }
    else{
      this.banderaMostrarSalir=false;
    }
  }

  ngOnInit() {
    this.apiSisEvent.obtenerNumeroEventos().subscribe(
      res => {
        this.eventos = res;
      },
      err => console.log("error")
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
