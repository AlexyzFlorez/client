import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ApiSisEventService } from '../api-sis-event.service';

@Injectable({
  providedIn: 'root'
})
export class EditorGuard implements CanActivate {
  
  constructor(public apiSisEvent: ApiSisEventService, public router:Router){}

  canActivate( )
  {
   if(this.apiSisEvent.tipoUsuarioLogin==="Editor" || this.apiSisEvent.tipoUsuarioLogin==="Administrador")
   {
     console.log("PASO GUARD EDITOR")
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
  
