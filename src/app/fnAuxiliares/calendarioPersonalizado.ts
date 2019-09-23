import localeEs from '@angular/common/locales/es';
import * as moment from 'moment';

class CalendarioPersonalizado
{
    public calendarOptions(eventos)
    {
       let calendarOptions = {
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
            events: eventos,
        
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
    
      return calendarOptions;
    }
}
export const calendarioPersonalizado=new CalendarioPersonalizado();
