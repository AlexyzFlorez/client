import { Component, OnInit } from '@angular/core';
import {dataTablePersonalizada} from '../../../fnAuxiliares/datatablePersonalizada';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ipn-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styles: []
})
export class MisEventosComponent implements OnInit {

  dtOptions:any;
  constructor(private titleService: Title) {
    
    this.titleService.setTitle('Mis eventos');
  }


  ngOnInit() {
    this.dtOptions=dataTablePersonalizada.dtOptions();
  }


}
