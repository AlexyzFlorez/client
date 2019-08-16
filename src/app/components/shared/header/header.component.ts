import { Component, OnInit } from '@angular/core';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ipn-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  tipoUsuario:String;
  token:String;
  idUsuarioLogin:string;

  constructor(private router: Router, private apiSisEvent: ApiSisEventService) {
    this.tipoUsuario=localStorage.getItem('tipo');
    this.token=localStorage.getItem('token');
    this.idUsuarioLogin=localStorage.getItem('id')
  }

  ngOnInit() {
  }

}
