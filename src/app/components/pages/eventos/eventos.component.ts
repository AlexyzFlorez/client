import { Component, OnInit } from '@angular/core';
import {dataTablePersonalizada} from '../../../fnAuxiliares/datatablePersonalizada';

@Component({
  selector: 'ipn-eventos',
  templateUrl: './eventos.component.html',
  styles: []
})
export class EventosComponent implements OnInit {
  dtOptions:any;
  constructor() { }

  ngOnInit() {
    this.dtOptions=dataTablePersonalizada.dtOptions();
  }

}
