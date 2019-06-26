import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ipn-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Crear cuenta');
  }

  ngOnInit() {
  }

}
