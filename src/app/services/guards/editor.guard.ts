import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ApiSisEventService } from '../api-sis-event.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditorGuard implements CanActivate {
  
  constructor(public apiSisEvent: ApiSisEventService, public router:Router){}

  canActivate( )
  {
   if(this.apiSisEvent.tipoUsuarioLogin===environment.TIPO_ADMINISTRADOR || this.apiSisEvent.tipoUsuarioLogin===environment.TIPO_EDITOR)
   {
     console.log("PASO GUARD EDITOR")
      return true;
   }
   else
   {
    console.log("NO PASO GUARD EDITOR")
    this.apiSisEvent.salir();
    return false;
   }
  }
}
  
