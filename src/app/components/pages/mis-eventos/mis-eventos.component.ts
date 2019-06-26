import { Component, OnInit } from '@angular/core';
import {dataTablePersonalizada} from '../../../fnAuxiliares/datatablePersonalizada';

@Component({
  selector: 'ipn-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styles: []
})
export class MisEventosComponent implements OnInit {

  dtOptions:any;
  constructor() { }

  ngOnInit() {
    this.dtOptions=dataTablePersonalizada.dtOptions();
  }


}
