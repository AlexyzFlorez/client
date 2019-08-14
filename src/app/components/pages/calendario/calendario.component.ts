import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Title } from '@angular/platform-browser';
import { ApiSisEventService } from '../../../services/api-sis-event.service';
import { Router } from '@angular/router';

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
  eventDragStop:any;

  defaultConfigurations: any;
  tipoUsuario:String;
  token:String;

  constructor(private titleService: Title, private router: Router, private apiSisEvent: ApiSisEventService) {
    this.tipoUsuario=localStorage.getItem('tipo');
    this.token=localStorage.getItem('token');

    this.titleService.setTitle('Calendario');

    this.eventData = [
      {
        title: 'Graduación',
        start: new Date(2019,5,5,10,20)
      },
      {
        title: 'Conferencia',
        start: new Date(2019,5,12,8,30),
        end: new Date(2019,5,15,10,0)
      },
      {
        title: 'Policamp',
        start: moment()
      },
      {
        title: 'Taller',
        start: new Date(2019,5,19,13,11), //el mes -1
        end: new Date(2019,5,20,10,0)
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
  }
}