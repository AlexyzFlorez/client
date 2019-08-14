import { Component, OnInit } from '@angular/core';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ipn-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  tipoUsuario:String;
  token:String="Ninguno";

  constructor(private router: Router, private apiSisEvent: ApiSisEventService) {
    this.tipoUsuario=localStorage.getItem('tipo');
    this.token=localStorage.getItem('token');
  }

  ngOnInit() {
  }

}
