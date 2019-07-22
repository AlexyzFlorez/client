import { Component, OnInit } from '@angular/core';
import {dataTablePersonalizada} from '../../../fnAuxiliares/datatablePersonalizada';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ipn-evento',
  templateUrl: './evento.component.html',
  styles: []
})
export class EventoComponent implements OnInit {
  dtOptions:any;
  constructor(private titleService: Title) {
    
    this.titleService.setTitle('Evento');
  }

  ngOnInit() {
    this.dtOptions=dataTablePersonalizada.dtOptions();
  }

}
