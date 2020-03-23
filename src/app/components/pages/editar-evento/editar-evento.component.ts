import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Evento } from 'src/app/models/evento';
import { environment } from 'src/environments/environment';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fechas } from 'src/app/fnAuxiliares/fechas';
import { FormularioEvento } from 'src/app/fnAuxiliares/formularioEvento';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
import { ErrorHelper } from 'src/app/fnAuxiliares/errorHelper';


@Component({
  selector: 'ipn-editar-evento',
  templateUrl: './editar-evento.component.html',
  styles: []
})
export class EditarEventoComponent implements OnInit {
  evento;
  rutaArchivo = environment.URI_ARCHIVOS;
  fechas = new Fechas();
  errorHelper;
  tipoUsuario;
  miFormularioEvento = new FormularioEvento();
  departamentos: any;
  actividades: any;
  categorias: any;
  ponentesArray: any;
  poblaciones: any;
  portada: File;
  respuesta: any = { errores: [] };

  constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService, private activeRoute: ActivatedRoute) {
    this.titleService.setTitle('Editar evento');
    this.tipoUsuario = localStorage.getItem('tipo_usuario');
    this.errorHelper = new ErrorHelper(this.router, this.apiSisEvent);
  }

  ngOnInit() {
    this.evento = new Evento();

    this.apiSisEvent.obtenerDepartamentos().subscribe(
      res => {
        this.departamentos = res;
      },
      err => this.errorHelper.manejarError(err.status)
    );

    this.apiSisEvent.obtenerActividades().subscribe(
      res => {
        this.actividades = res;
      },
      err => this.errorHelper.manejarError(err.status)
    );

    this.apiSisEvent.obtenerCategorias().subscribe(
      res => {
        this.categorias = res;
      },
      err => this.errorHelper.manejarError(err.status)
    );

    this.apiSisEvent.obtenerPonentes().subscribe(
      res => {
        this.ponentesArray = res;
      },
      err => this.errorHelper.manejarError(err.status)
    );

    this.apiSisEvent.obtenerPoblacion().subscribe(
      res => {
        this.poblaciones = res;
      },
      err => this.errorHelper.manejarError(err.status)
    );

    const idEvento = this.activeRoute.snapshot.params.id;
    this.apiSisEvent.obtenerDetallesEvento(idEvento).subscribe(
      res => {
        this.evento = res;

        this.evento.hora_inicio = this.fechas.darFormatoHora(this.evento.hora_inicio);
        this.evento.hora_termino = this.fechas.darFormatoHora(this.evento.hora_termino);

        this.miFormularioEvento.archivoCargado = true;
        this.miFormularioEvento.archivoFormato =true;
      },
      err => this.errorHelper.manejarError(err.status)
    );
  }

  onFileChange(e) {
    this.portada = e.target.files[0];
    this.miFormularioEvento.archivoCargado = true;

    //Validamos extension
    this.miFormularioEvento.archivoFormato = this.miFormularioEvento.validarFormatoArchivo(this.portada);
  }

  editarEvento() {
    let nombre = this.evento.nombre;
    let departamento = this.evento.departamento.nombre;
    let costo = this.evento.costo;
    let tipoActividad = this.evento.tipo_actividad.nombre;
    let nombreActividad = this.evento.actividad;
    let categoria = this.evento.categoria.nombre;
    let ponentes = this.evento.ponentes.nombre;
    let poblacion = this.evento.poblacion.nombre;
    let fechaInicio = this.evento.fecha_inicio;
    let fechaTermino = this.evento.fecha_termino;
    let horaInicio = this.evento.hora_inicio;
    let horaTermino = this.evento.hora_termino;
    let descripcion = this.evento.descripcion;
    let solicitudMemoria = this.evento.solicitud_memoria;

    //VALIDACIONES DE FORMULARIO

    //Nombre
    this.miFormularioEvento.nombreVacio = this.miFormularioEvento.validarCampoVacio(nombre);

    //Departamento
    this.miFormularioEvento.departamentoVacio = this.miFormularioEvento.validarCampoVacio(departamento);

    //Costo
    this.miFormularioEvento.costoVacio = this.miFormularioEvento.validarCampoVacio(costo);
    this.miFormularioEvento.costoFormato = this.miFormularioEvento.validarFormatoCosto(costo);

    //Tipo de actividad
    this.miFormularioEvento.tipoActividadVacio = this.miFormularioEvento.validarCampoVacio(tipoActividad);

    if (tipoActividad == "Otra") {
      //Nombre de actividad
      this.miFormularioEvento.nombreActividadVacio = this.miFormularioEvento.validarCampoVacio(nombreActividad);
      this.miFormularioEvento.nombreActividadFormato = this.miFormularioEvento.validarFormatoNombre(nombreActividad);
    }

    //Categoria
    this.miFormularioEvento.categoriaVacia = this.miFormularioEvento.validarCampoVacio(categoria);

    //Ponentes
    this.miFormularioEvento.ponentesVacios = this.miFormularioEvento.validarCampoVacio(ponentes);

    //poblacion
    this.miFormularioEvento.poblacionVacia = this.miFormularioEvento.validarCampoVacio(poblacion);

    //solicitud memoria
    this.miFormularioEvento.solicitudMemoriaVacia = this.miFormularioEvento.validarCampoVacio(solicitudMemoria);

    //Fecha inicio
    this.miFormularioEvento.fechaInicioValida = this.miFormularioEvento.validarFecha(new Date(), new Date(`${fechaInicio}`));

    //Fecha termino
    this.miFormularioEvento.fechaTerminoValida = this.miFormularioEvento.validarFecha(new Date(), new Date(`${fechaTermino}`));

    //Fecha termino mayor  amenor
    this.miFormularioEvento.fechasValidas = this.miFormularioEvento.validarFechas(new Date(`${fechaInicio}`), new Date(`${fechaTermino}`));

    //Hora inicio
    this.miFormularioEvento.horaInicioVacia = this.miFormularioEvento.validarCampoVacio(horaInicio);

    //Hora termino
    this.miFormularioEvento.horaTerminoVacia = this.miFormularioEvento.validarCampoVacio(horaTermino);

    //Descripcion
    this.miFormularioEvento.descripcionVacia = this.miFormularioEvento.validarCampoVacio(descripcion);

    let validacionFormulario: any;
    //Archivo
    if (!this.miFormularioEvento.archivoFormato) {
      this.miFormularioEvento.archivoFormato = false;
    }

    //Validamos los estados de campos,primero campos vacios
    if (!this.miFormularioEvento.solicitudMemoriaVacia && !this.miFormularioEvento.nombreVacio && !this.miFormularioEvento.departamentoVacio && !this.miFormularioEvento.costoVacio && !this.miFormularioEvento.tipoActividadVacio && !this.miFormularioEvento.categoriaVacia && !this.miFormularioEvento.ponentesVacios && !this.miFormularioEvento.poblacionVacia && !this.miFormularioEvento.horaInicioVacia && !this.miFormularioEvento.horaTerminoVacia && !this.miFormularioEvento.descripcionVacia) {

      if ((tipoActividad == "Otra" && !this.miFormularioEvento.nombreActividadVacio) || ((tipoActividad != "Otra"))) {
        //Validamos formatos
        if (this.miFormularioEvento.costoFormato && this.miFormularioEvento.fechaInicioValida && this.miFormularioEvento.fechaTerminoValida && this.miFormularioEvento.fechasValidas && this.miFormularioEvento.archivoFormato && this.miFormularioEvento.archivoCargado) {

          if ((tipoActividad == "Otra" && this.miFormularioEvento.nombreActividadFormato) || ((tipoActividad != "Otra"))) {

            validacionFormulario = true;
          }
          else {
            // console.log("Formatos invalidos")
            validacionFormulario = false;
          }
        }
        else {
          validacionFormulario = false;
        }
      }
      else {
        // console.log("Campos vacios")
        validacionFormulario = false;
      }
    }
    else {
      validacionFormulario = false;
    }

    //SI EL FORMULARIO ES VALIDO
    if (validacionFormulario === true) {
      //console.log("Campos Validos");
      let formData = new FormData();

      formData.append('usuario', localStorage.getItem('_id'));
      formData.append('nombre', this.evento.nombre);
      formData.append('departamento', this.evento.departamento.nombre);
      formData.append('costo', this.evento.costo);
      formData.append('tipo_actividad', this.evento.tipo_actividad.nombre);
      formData.append('actividad', this.evento.actividad);
      formData.append('categoria', this.evento.categoria.nombre);
      formData.append('fecha_inicio', this.evento.fecha_inicio.toString());
      formData.append('fecha_termino', this.evento.fecha_termino.toString());
      formData.append('hora_inicio', this.evento.hora_inicio);
      formData.append('hora_termino', this.evento.hora_termino);
      formData.append('descripcion', this.evento.descripcion);
      formData.append('ponentes', this.evento.ponentes.nombre);
      formData.append('poblacion', this.evento.poblacion.nombre);
      formData.append('solicitud_memoria', this.evento.solicitud_memoria);
      formData.append('hombres', this.evento.hombres);
      formData.append('mujeres', this.evento.mujeres);

      if(this.portada==undefined){

      }
      else{
        formData.append('archivo', this.portada, this.portada.name);
      }

      this.apiSisEvent.editarEvento(this.activeRoute.snapshot.params.id, formData).subscribe(
        res => {
          this.respuesta = res;

          if (this.respuesta.errores.includes('Ninguno')) {

            this.miFormularioEvento.estado = 1;
            setTimeout(() => {
              this.miFormularioEvento.estado = 0;
            }, 1000);

            swal({
              icon: "success",
              title: "Correcto",
              text: "Evento actualizado correctamente."
            });

            const idEvento = this.activeRoute.snapshot.params.id;
            this.apiSisEvent.obtenerDetallesEvento(idEvento).subscribe(
              res => {
                this.evento = res;

                this.evento.hora_inicio = this.fechas.darFormatoHora(this.evento.hora_inicio);
                this.evento.hora_termino = this.fechas.darFormatoHora(this.evento.hora_termino);
              },
              err => this.errorHelper.manejarError(err.status)
            );
          }
          else if (this.respuesta.errores.includes('Actividad existente')) {
            this.miFormularioEvento.estado = 2;

            setTimeout(() => {
              this.miFormularioEvento.estado = 0;
            }, 2000);

            swal({
              icon: "error",
              title: "Error",
              text: "El nombre de la actividad ya existe en las opciones."
            });
          }
          else if (this.respuesta.errores.includes('Consultas')) {
            this.miFormularioEvento.estado = 2;

            setTimeout(() => {
              this.miFormularioEvento.estado = 0;
            }, 2000);

            swal({
              icon: "error",
              text: "Error, vuelve a intentarlo"
            });
          }
        },
        err => {
          //console.log('Errores en el servidor');
          this.miFormularioEvento.estado = 2;

          setTimeout(() => {
            this.miFormularioEvento.estado = 0;
          }, 2000);

          this.errorHelper.manejarError(err.status)
        });
    }
    else {
     // console.log("Campos Invalidos");
    }
  }

  verEvidencias() {
    const idEvento = this.activeRoute.snapshot.params.id;
    this.router.navigate([`/evidencias/${idEvento}`]);
  }
}
