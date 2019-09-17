import { Component, OnInit, Input } from '@angular/core';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ipn-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  tipoUsuario: String;
  token: String = "Ninguno";
  eventos: any;
  mostrarContadores:boolean=true;

  constructor(private router: Router, private apiSisEvent: ApiSisEventService) {
    this.tipoUsuario = localStorage.getItem('tipo');
    this.token = localStorage.getItem('token');
 
  }

  ngOnInit() {
    this.apiSisEvent.obtenerNumeroEventos().subscribe(
      res => {
        this.eventos = res;
        console.log("Cargados")
      },
      err => console.log("error")
    );
  }

  mostrarEventos() {
  
    if(this.mostrarContadores==true){
        this.mostrarContadores=false;
    }
    else
    {
      this.mostrarContadores=true;
    }
  }

}
