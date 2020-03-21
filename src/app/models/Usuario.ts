import { Departamento } from './departamento';
import { Evento } from './evento';

export class Usuario {

  public _id: string;
  public nombre: string;
  public apellido_paterno: string;
  public apellido_materno: string;
  public telefono: string;
  public num_empleado: string;
  public departamento: Departamento;
  public correo: string;
  public password: string;
  public password2: string;
  public tipo_usuario: string;
  public estado_registro: string;
  public codigo_res_password: string;
  public eventos: Evento[];
    
    constructor() {
      this._id = "";
      this.nombre = "";
      this.apellido_paterno = "";
      this.apellido_materno = "";
      this.telefono = "";
      this.num_empleado = "";    
      this.departamento = new Departamento();
      this.correo = "";
      this.password = "";
      this.password2 = "";
      this.tipo_usuario = "";
      this.estado_registro = "";
      this.codigo_res_password = "";
      this.eventos=[];
    }
  }
  