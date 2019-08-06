import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiSisEventService } from '../api-sis-event.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public apiSisEvent: ApiSisEventService, public router: Router) { }

  canActivate() {
    if (this.apiSisEvent.estaLogueado()) 
    {
      console.log('PASO EL GUARD LOGIN')
      return true;
    }
    else 
    {
      console.log('NO PASO EL GUARD LOGIN')
      this.router.navigate(['/login']);
      return false;
    }
  }
}
