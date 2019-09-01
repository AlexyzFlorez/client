import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Title } from '@angular/platform-browser';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { Router } from '@angular/router';
import { FormularioEvento } from 'src/app/models/FormularioEvento';
import { Evento } from 'src/app/models/Evento';

registerLocaleData(localeEs);
@Component({
  selector: 'ipn-calendario',
  templateUrl: './calendario.component.html',
  styles: []
})

export class CalendarioComponent implements OnInit {


  @Input()
  set configurations(config: any) {
    if (config) {
      this.defaultConfigurations = config;
    }
  }
  @Input() eventData: any;
  dayClick: any;
  eventDragStart: any;
  eventDragStop: any;

  defaultConfigurations: any;
  tipoUsuario: String;
  token: String;
  evento = new Evento();
  miFormularioEvento = new FormularioEvento();
  respuesta: any = { errores: [] };
  departamentos: any;
  actividades: any;
  categorias: any;
  portada: File;

  constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService) {
    this.tipoUsuario = localStorage.getItem('tipo');
    this.token = localStorage.getItem('token');

    this.titleService.setTitle('Calendario');

    this.eventData = [
      {
        title: 'Graduación',
        start: new Date(2019, 5, 5, 10, 20)
      },
      {
        title: 'Conferencia',
        start: new Date(2019, 5, 12, 8, 30),
        end: new Date(2019, 5, 15, 10, 0)
      },
      {
        title: 'Policamp',
        start: moment()
      },
      {
        title: 'Taller',
        start: new Date(2019, 5, 19, 13, 11), //el mes -1
        end: new Date(2019, 5, 20, 10, 0)
      },
    ];

    this.defaultConfigurations = {
      locale: 'es',
      editable: true,
      eventLimit: true,
      titleFormat: 'MMM D YYYY',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Dia'
      },
      views: {
        agenda: {
          eventLimit: 2
        }
      },
      allDaySlot: false,
      slotDuration: moment.duration('00:15:00'),
      slotLabelInterval: moment.duration('01:00:00'),
      firstDay: 1,
      selectable: true,
      selectHelper: true,
      events: this.eventData,

      dayClick: (date, jsEvent, activeView) => {
        console.log("Agregar evento")
      },
      eventClick: (date, jsEvent, activeView) => {
        console.log(date)
        console.log(date._id);
        console.log(date.title)
        console.log(date.start)
        console.log(date.end)
      }
    };


  }
  ngOnInit() {
    $('#full-calendar').fullCalendar(
      this.defaultConfigurations
    );

    this.apiSisEvent.obtenerDepartamentos().subscribe(
      res => {
        this.departamentos = res;
      },
      err => console.log("error")
    );

    this.apiSisEvent.obtenerActividades().subscribe(
      res => {
        this.actividades = res;
      },
      err => console.log("error")
    );

    this.apiSisEvent.obtenerCategorias().subscribe(
      res => {
        this.categorias = res;
      },
      err => console.log("error")
    );
  }

  onFileChange(e) {
    this.portada = e.target.files[0];
    this.miFormularioEvento.archivoCargado = true;

    //Validamos extension
    this.miFormularioEvento.archivoFormato = this.miFormularioEvento.validarFormatoArchivo(this.portada);
  }

  registrarEvento() {
    let btnRegistrarEvento = document.getElementById("btn-registrar-evento")
    //Cerrar modal btnRegistrarEvento.setAttribute("data-dismiss", "modal");

    let nombre = this.evento.nombre;
    let departamento = this.evento.departamento;
    let costo = this.evento.costo;
    let tipoActividad = this.evento.tipoActividad;
    let nombreActividad = this.evento.nombreActividad;
    let categoria = this.evento.categoria;
    let fechaInicio = this.evento.fechaInicio;
    let fechaTermino = this.evento.fechaTermino;
    let horaInicio = this.evento.horaInicio;
    let horaTermino = this.evento.horaTermino;
    let descripcion = this.evento.descripcion;

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

    if (tipoActividad == "Otro") {
      //Nombre de actividad
      this.miFormularioEvento.nombreActividadVacio = this.miFormularioEvento.validarCampoVacio(nombreActividad);
      this.miFormularioEvento.nombreActividadFormato = this.miFormularioEvento.validarFormatoNombre(nombreActividad);
    }

    //Categoria
    this.miFormularioEvento.categoriaVacia = this.miFormularioEvento.validarCampoVacio(categoria);

    //Fecha inicio
    this.miFormularioEvento.fechaInicioValida = this.miFormularioEvento.validarFecha(new Date(), new Date(`${fechaInicio}`));

    //Fecha termino
    this.miFormularioEvento.fechaTerminoValida = this.miFormularioEvento.validarFecha(new Date(), new Date(`${fechaTermino}`));

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
    if (!this.miFormularioEvento.nombreVacio && !this.miFormularioEvento.departamentoVacio && !this.miFormularioEvento.costoVacio && !this.miFormularioEvento.tipoActividadVacio && !this.miFormularioEvento.categoriaVacia && !this.miFormularioEvento.horaInicioVacia && !this.miFormularioEvento.horaTerminoVacia && !this.miFormularioEvento.descripcionVacia) {
    console.log('1')
      if ((tipoActividad == "Otro" && !this.miFormularioEvento.nombreActividadVacio) || ((tipoActividad != "Otro"))) {
        //Validamos formatos
        console.log('2')
        if (this.miFormularioEvento.costoFormato && this.miFormularioEvento.fechaInicioValida && this.miFormularioEvento.fechaTerminoValida && this.miFormularioEvento.archivoFormato && this.miFormularioEvento.archivoCargado) {
          console.log('3')
          if ((tipoActividad == "Otro" && this.miFormularioEvento.nombreActividadFormato) || ((tipoActividad != "Otro"))) {
            console.log('4')
            validacionFormulario = true;
          }
          else {
            console.log("Formatos invalidos")
            validacionFormulario = false;
          }
        }
        else {
          validacionFormulario = false;
        }
      }
      else {
        console.log("Campos vacios")
        validacionFormulario =false;
      }
    }
    else {
      validacionFormulario = false;
    }

    //SI EL FORMULARIO ES VALIDO
    if (validacionFormulario === true) {
      console.log("Campos Validos");
      let formData = new FormData();

      formData.append('nombre', this.evento.nombre);
      formData.append('departamento', this.evento.departamento);
      formData.append('costo', this.evento.costo);
      formData.append('tipo_actividad', this.evento.tipoActividad);
      formData.append('nombre_actividad', this.evento.nombreActividad);
      formData.append('categoria', this.evento.categoria);
      formData.append('fecha_inicio', this.evento.fechaInicio.toString());
      formData.append('fecha_termino', this.evento.fechaTermino.toString());
      formData.append('hora_inicio', this.evento.horaInicio);
      formData.append('hora_termino', this.evento.horaTermino);
      formData.append('descripcion', this.evento.descripcion);

      formData.append('archivo', this.portada, this.portada.name);
      console.log(formData)
      console.log("Listo para enviar")

      this.apiSisEvent.registrarEvento(formData).subscribe(
        res => {
          this.respuesta = res;

          if (this.respuesta.errores.includes('Ninguno')) {
            this.miFormularioEvento.estado = 1;
            setTimeout(() => {
              this.miFormularioEvento.estado = 0;
            }, 1000);

            this.miFormularioEvento.archivoCargado = false;
            this.miFormularioEvento.archivoFormato = undefined;
          }
          else if (this.respuesta.errores.includes('Consultas')) {
            this.miFormularioEvento.estado = 2;

            setTimeout(() => {
              this.miFormularioEvento.estado = 0;
            }, 2000);
          }
        },
        err => {
          console.log('Errores en el servidor');
          this.miFormularioEvento.estado = 2;

          setTimeout(() => {
            this.miFormularioEvento.estado = 0;
          }, 2000);
        });
    }
    else {
      console.log("Campos Invalidos");
    }
  }
}