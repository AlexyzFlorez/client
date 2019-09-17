export class Fechas {

    constructor() {
  
    }

    darFormato(fecha)
    {
      if(fecha!=undefined)
      {
        let soloFecha=fecha.substring(0,10);
  
        let fechaFormateada = soloFecha.split('-').join('-');
        return fechaFormateada;
      }
      else
      {
        return '';
      }
    }

    darFormatoHora(hora)
    {
      if(hora!=undefined)
      {
        let hrs=parseInt(hora.substring(0,2));
        let min=hora.substring(3,5);
        let amPm;
  
        if(hrs>=12)
        {
          amPm="p. m.";
          hrs=hrs-12;
        }
        else
        {
          amPm="a. m.";
        }
  
        if(hrs==0)
        {
          hrs=12;
        }
  
        let horas=hrs.toString();
        if (horas.length < 2) horas = '0' + horas;
  
        return `${horas}:${min} ${amPm}`;
      }
      else
      {
        return '';
      }
    }
  }
  