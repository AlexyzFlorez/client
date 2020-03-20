import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ApiSisEventService } from '../api-sis-event.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(public apiSisEvent: ApiSisEventService, public router:Router){}

  canActivate( )
  {
   if(this.apiSisEvent.tipoUsuarioLogin===environment.TIPO_ADMINISTRADOR)
   {
     console.log("PASO GUARD ADMINISTRADOR")
      return true;
   }
   else
   {
    console.log("NO PASO GUARD ADMINISTRADOR")
    this.apiSisEvent.salir();
    return false;
   }
  }
}
  