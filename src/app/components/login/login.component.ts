import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ipn-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Iniciar sesión');
  }

  ngOnInit() {
  }

}
