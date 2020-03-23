import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Evento } from 'src/app/models/evento';
import { environment } from 'src/environments/environment';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fechas } from 'src/app/fnAuxiliares/fechas';
import { ErrorHelper } from 'src/app/fnAuxiliares/errorHelper';
import { Evidencia } from 'src/app/models/evidencia';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'ipn-evidencias',
  templateUrl: './evidencias.component.html',
  styles: []
})
export class EvidenciasComponent implements OnInit {

  evento;
  rutaArchivo = environment.URI_ARCHIVOS;
  fechas = new Fechas();
  errorHelper;
  tipoUsuario;
  banderaAgregarEvidencias=false;
  evidenciasVacias: boolean;
  evidencias:any=[];
  evidencia = new Evidencia();

  constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService, private activeRoute: ActivatedRoute) {
    this.titleService.setTitle('Evidencia vento');
    this.tipoUsuario = localStorage.getItem('tipo_usuario');
    this.errorHelper = new ErrorHelper(this.router, this.apiSisEvent);
  }

  ngOnInit() {
    this.obtenerEvento();
  }

  obtenerEvento(){
    const idEvento = this.activeRoute.snapshot.params.id;
    this.apiSisEvent.obtenerDetallesEvento(idEvento).subscribe(
      res => {
        this.evento = res;

        this.evento.evidencias=[
          {
            _id:"id_prueba",
            url_evidencia:"2f67904b-bf2b-46cd-ba94-7221f50e0240.png",
            descripcion:"Descripcion de la primer evidencia"
          }
        ]

        this.evidencias=this.evento.evidencias;

        if(this.evidencias.length<5){
          this.banderaAgregarEvidencias=true;
        }
        else{
          this.banderaAgregarEvidencias=false;
        }

        if (this.evidencias.length < 1 || this.evidencias.length == undefined) {
          this.evidenciasVacias = true;
        }
        else {
          this.evidenciasVacias = false;
        }
      },
      err => this.errorHelper.manejarError(err.status)
    );
  }

  eliminarEvidencia(id: string) {
    swal({
      title: "¿Estás seguro?",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
      .then((borrar) => {
        if (borrar) {

          this.apiSisEvent.existeUsuario(localStorage.getItem('_id')).subscribe(
            res => {
              let respuesta: any = res;
              if (respuesta.errores.includes('No existe')) {
                this.apiSisEvent.salir();
              }
              else {
                this.apiSisEvent.eliminarEvidencia(id).subscribe(
                  res => {
                    swal({
                      title: "Correcto",
                      icon: "success",
                      text: "Evidencia eliminada correctamente."
                    });
                    this.obtenerEvento();
                  },
                  err => this.errorHelper.manejarError(err.status)
                );
              }
            },
            err => this.errorHelper.manejarError(err.status)
          );
        }
      });
  }

}
