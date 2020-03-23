import { Router } from '@angular/router';
import { ApiSisEventService } from '../services/api-sis-event.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

export class ErrorHelper
{
    constructor(private router: Router,private apiSisEventService: ApiSisEventService){

    }

    public manejarError(status)
    {
        console.log("Manejear error", status)
        switch (status) {
            case 401:
                this.apiSisEventService.salir();
                break;
        
            default:
                swal({
                    title: "Error",
                    text: "Algo salió mal.",
                    icon: "error"
                  })
                //  this.router.navigate(['/calendario']);
                break;
        }
    }
}
