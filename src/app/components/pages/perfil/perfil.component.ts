import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ipn-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  constructor(private titleService: Title) {
    
    this.titleService.setTitle('Perfil');
  }


  ngOnInit() {
  }

}
