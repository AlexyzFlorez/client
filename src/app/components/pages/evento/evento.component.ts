import { Component, OnInit } from '@angular/core';
import {dataTablePersonalizada} from '../../../fnAuxiliares/datatablePersonalizada';

@Component({
  selector: 'ipn-evento',
  templateUrl: './evento.component.html',
  styles: []
})
export class EventoComponent implements OnInit {
  dtOptions:any;
  constructor() { }

  ngOnInit() {
    this.dtOptions=dataTablePersonalizada.dtOptions();
  }

}
