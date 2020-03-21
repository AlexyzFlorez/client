export class FormularioEvento {

  //Generales del formulario
  public estado: number; //0, sin estado, 1 exito, 3, error del servidor

  //Validaciones de campos vacios de usuario
  public nombreVacio: boolean;
  public departamentoVacio: boolean;
  public costoVacio: boolean;
  public tipoActividadVacio: boolean;
  public nombreActividadVacio: boolean;
  public categoriaVacia: boolean;
  public fechaIncioVacia: boolean;
  public fechaTerminoVacia: boolean;
  public horaInicioVacia: boolean;
  public horaTerminoVacia: boolean;
  public descripcionVacia: boolean;
  public ponentesVacios: boolean;
  public poblacionVacia: boolean;

  //Validacion de Formatos de usuario
  public nombreFormato: boolean;
  public departamentoFormato: boolean;
  public costoFormato: boolean;
  public tipoActividadFormato: boolean;
  public nombreActividadFormato: boolean;
  public categoriaFormato: boolean;
  public fechaIncioFortmato: boolean;
  public fechaTerminoFormato: boolean;
  public horaInicioFortmato: boolean;
  public horaTerminoFormato: boolean;
  public descripcionFormato: boolean;
  public archivoFormato: boolean;

  //Validacion de Formatos de evento
  public fechaInicioValida?: boolean;
  public fechaTerminoValida?: boolean;
  public fechasValidas?: boolean;
  public archivoCargado: boolean;

  public correoNoPreregistrado: boolean;
  public numEmpleadoRegistrado: boolean;

  constructor() {

  }

  validarCampoVacio(campo: any): boolean {
    if (campo === undefined || campo === '' || campo === null) {
      return true;
    }
    else {
      return false;
    }
  }

  validarFormatoNombre(campo: string): boolean {
    const patternNombre = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
    if (patternNombre.exec(campo)) {
      return true;
    }
    else {
      return false;
    }
  }

  validarFormatoCosto(campo: string): boolean {
    let contadorPuntos = 0;
    let contadorNoNumeros = 0;

    if (campo != undefined) {
      for (let i = 0; i < campo.length; i++) {
        if (campo[i] == '.') {
          contadorPuntos++;
        }

        if ((campo.charCodeAt(i) < 48 && campo.charCodeAt(i) != 46) || (campo.charCodeAt(i) > 57 && campo.charCodeAt(i) != 46)) {
          contadorNoNumeros++;
        }
      }

      if (contadorPuntos > 1 || contadorNoNumeros > 0) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }

  validarFormatoArchivo(archivo: File): boolean {
    if (archivo === undefined) {
      return false;
    }
    else {
      let nombre = archivo.name;
      let extension = (nombre.substring(nombre.lastIndexOf("."))).toLowerCase();

      if (extension === '.png' || extension === '.jpg') {
        return true;
      }
      else {
        return false;
      }
    }
  }

  validarFecha(fechaActual: Date, fechaFormulario: Date): boolean {
    fechaActual.setHours(0, 0, 0, 0);
    fechaFormulario.setHours(0, 0, 0, 0);
    fechaFormulario.setDate(fechaFormulario.getDate() + 1); //Le sumamos 1 para que coincida con la fecha que introdujo el usuario

    if (fechaFormulario >= fechaActual && fechaFormulario != undefined) {
      return true;
    }
    else {
      return false;
    }
  }

  validarFechas(fechaInicio:Date,fechaTermino:Date):boolean
  {
   
    fechaInicio.setHours(0,0,0,0);
    fechaInicio.setDate(fechaInicio.getDate()+1); //Le sumamos 1 para que coincida con la fecha que introdujo el usuario
  
    fechaTermino.setHours(0,0,0,0);
    fechaTermino.setDate(fechaTermino.getDate()+1); //Le sumamos 1 para que coincida con la fecha que introdujo el usuario
  
    if(fechaTermino>=fechaInicio)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  
}
