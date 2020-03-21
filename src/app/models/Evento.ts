import { Usuario } from './usuario';
import { Departamento } from './departamento';
import { Actividad } from './actividad';
import { Categoria } from './categoria';
import { Poblacion } from './poblacion';
import { Ponente } from './ponente';
import { Evidencia } from './evidencia';

export class Evento {

  public _id: string;
  public usuario: Usuario;
  public nombre: string;
  public departamento: Departamento;
  public costo: string;
  public tipo_actividad: Actividad;
  public actividad: string;
  public categoria: Categoria;
  public fecha_inicio: string;
  public fecha_termino: string;
  public hora_inicio: string;
  public hora_termino: string;
  public descripcion: string;
  public ponentes: Ponente
  public poblacion: Poblacion;
  public url_portada: string;
  public evidencias: Evidencia[];
  public solicitud_memoria:string;
  public en_memoria: boolean;

  constructor() {
    this._id="";
    this.usuario=new Usuario();
    this.nombre="";
    this.departamento=new Departamento();
    this.costo="";
    this.tipo_actividad=new Actividad();
    this.actividad="";
    this.categoria=new Categoria();
    this.fecha_inicio="";
    this.fecha_termino="";
    this.hora_inicio="";
    this.hora_termino="";
    this.descripcion="";
    this.ponentes=new Ponente();
    this.poblacion=new Poblacion();
    this.url_portada="";
    this.evidencias=[];
    this.solicitud_memoria="";
    this.en_memoria=false;
  }
}
