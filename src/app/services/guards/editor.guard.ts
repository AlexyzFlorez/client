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
   if(this.apiSisEvent.tipoUsuarioLogin==="$2a$10$m3XP./02B3jWnBX1YV.Ua.vWD2LXw/oC81eAjnPaJrqV0ImnD3SxW" || this.apiSisEvent.tipoUsuarioLogin==="$2a$10$kAuF.n3BG7N8rXpqKnGziOkk8jplw4DWVdkUshhsc3Bvt8YVx2Yom")
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
  
