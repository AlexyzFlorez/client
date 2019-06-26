import { Component, OnInit } from '@angular/core';
import {dataTablePersonalizada} from '../../../fnAuxiliares/datatablePersonalizada';

@Component({
  selector: 'ipn-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  dtOptions:any;
  constructor() { }

  ngOnInit() {
    this.dtOptions=dataTablePersonalizada.dtOptions();
  }

}

