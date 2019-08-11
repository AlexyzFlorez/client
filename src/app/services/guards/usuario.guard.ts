import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ApiSisEventService } from '../api-sis-event.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  
  constructor(public apiSisEvent: ApiSisEventService, public router:Router){}

  canActivate( )
  {
   if(this.apiSisEvent.tipoUsuarioLogin==="Normal")
   {
     console.log("PASO GUARD USUARIO")
      return true;
   }
   else
   {
    console.log("NO PASO GUARD USUARIO")
    this.apiSisEvent.salir();
    return false;
   }
  }
}
  
