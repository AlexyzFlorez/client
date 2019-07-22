import { Component, OnInit } from '@angular/core';
import {dataTablePersonalizada} from '../../../fnAuxiliares/datatablePersonalizada';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ipn-eventos',
  templateUrl: './eventos.component.html',
  styles: []
})
export class EventosComponent implements OnInit {
  dtOptions:any;
  constructor(private titleService: Title) {
    
    this.titleService.setTitle('Eventos');
  }

  ngOnInit() {
    this.dtOptions=dataTablePersonalizada.dtOptions();
  }

}
