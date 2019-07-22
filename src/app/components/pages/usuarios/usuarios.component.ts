import { Component, OnInit } from '@angular/core';
import {dataTablePersonalizada} from '../../../fnAuxiliares/datatablePersonalizada';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ipn-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  dtOptions:any;
  constructor(private titleService: Title) {
    
    this.titleService.setTitle('Usuarios');
  }
  ngOnInit() {
    this.dtOptions=dataTablePersonalizada.dtOptions();
  }

}

