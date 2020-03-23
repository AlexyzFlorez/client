import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Evento } from 'src/app/models/evento';
import { environment } from 'src/environments/environment';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fechas } from 'src/app/fnAuxiliares/fechas';
import { ErrorHelper } from 'src/app/fnAuxiliares/errorHelper';
import { FormularioEvento } from 'src/app/fnAuxiliares/formularioEvento';
import { Evidencia } from 'src/app/models/evidencia';

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

    const idEvento = this.activeRoute.snapshot.params.id;
    this.apiSisEvent.obtenerDetallesEvento(idEvento).subscribe(
      res => {
        this.evento = res;
        console.log("evento",this.evento)

        this.evidencias=this.evento.evidencias;
        console.log("evidencias",this.evidencias)

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

}
