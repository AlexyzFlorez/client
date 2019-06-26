import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ipn-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('404 Page not found');
  }


  ngOnInit() {
  }

}
