import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ipn-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  tipoUsuario:string;

  constructor() { }

  ngOnInit() {
    this.tipoUsuario="Administrador"
  }

}
