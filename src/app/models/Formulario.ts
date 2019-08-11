export class Formulario {

    //Generales del formulario
    public estado: number; //0, sin estado, 1 exito, 3, error del servidor
  
    //Validaciones de campos vacios de usuario
    public nombreVacio: boolean;
    public apellidoPaternoVacio:boolean;
    public apellidoMaternoVacio:boolean;
    public telefonoVacio:boolean;
    public numEmpleadoVacio: boolean;
    public departamentoVacio: boolean;
    public correoVacio: boolean;
    public passwordVacia: boolean;
    public password2Vacia: boolean;
    public passwordIguales:boolean;

    //Validaciones de campos vacios de evento
    public fechaVacia?:boolean;
    public lugarVacio?:boolean;
    public horaVacia?:boolean;
  
    //Validacion de Formatos de usuario
    public nombreFormato: boolean;
    public apellidoPaternoFormato: boolean;
    public apellidoMaternoFormato: boolean;
    public telefonoFormato: boolean;
    public numEmpleadoFormato: boolean;
    public correoFormato: boolean;
    public passwordFormato: boolean;
    public password2Formato: boolean;
    public archivoFormato:boolean;

    //Validacion de Formatos de evento
    public fechaValida?:boolean;
    public lugarFormato?:boolean;
    
    public archivoCargado: boolean;
    public correoRegistrado: boolean;
    public usuarioRegistrado: boolean;
  
    public correoNoPreregistrado: boolean;
    public numEmpleadoRegistrado: boolean;
  
    constructor() {
  
    }

    validarCampoVacio(campo: any): boolean
    {
      if(campo===undefined || campo==='' || campo===null)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  
    validarFormatoCorreo(campo: string): boolean
    {
      const patternCorreo= /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
      if (patternCorreo.exec(campo))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  
    validarFormatoPassword(campo: string): boolean
    {
      if(campo.length>7)
      {
        const patternPass= /^[^%&|<>=#]*$/;
        if (patternPass.exec(campo))
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
    }
  
    validarFormatoNombre(campo: string): boolean
    {
      const patternNombre= /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
      if (patternNombre.exec(campo))
      {
        return true;
      }
      else
      {
        return false;
      }
    }

    validarFormatoTelefono(campo: string): boolean
    {
      if(campo.length==10)
      {
          const patternTelefono= /^\d*$/;
          if (patternTelefono.exec(campo))
          {
            return true;
          }
          else
          {
            return false;
          }
      }
      else
      {
          return false;
      }
    }
  
    validarFormatoLugar(campo: string): boolean
    {
      const patternLugar= /^[^$%&|<>=]*$/;
      if (patternLugar.exec(campo))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  
    validarPasswordsIguales(campoP1: string,campoP2:string): boolean
    {
      if(campoP1===campoP2)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  
    validarFormatoNumEmpleado(campo: string): boolean
    {
      if(campo.length>5 && campo.length<8)
      {
          const patternNumEmpleado= /^\d*$/;
          if (patternNumEmpleado.exec(campo))
          {
            return true;
          }
          else
          {
            return false;
          }
      }
      else
      {
          return false;
      }
    }
  
    validarFormatoArchivo(archivo:File): boolean
    {
      if(archivo===undefined)
      {
        return false;
      }
      else
      {
        let nombre=archivo.name;
        let extension = (nombre.substring(nombre.lastIndexOf("."))).toLowerCase();
  
        if(extension==='.png' || extension==='.jpg')
        {
          return true;
        }
        else
        {
          return false;
        }
      }
    }
  }
  