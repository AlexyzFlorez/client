export class Evento {

    //Generales
    public id_evento?: string;
    public nombre?: string;
    public costo?: string;
    public mujeres?: string;
    public hombres?: string;
    public horas?: string;
    public descripcion?: string;
    public url_portada?: string;
    public en_memoria?: boolean;
    public fk_id_usuario: string;
    public fecha_inicio: Date;
    public fecha_termino: Date;
    public hora_inicio: string;
    public hora_termino: string;
    public fk_id_departamento: string;
    public fk_id_actividad: string;
    public fk_id_categoria: string;
    public fk_id_ponentes:string;
    public fk_id_poblacion: string;
    public evidencias_cargadas: string;
    public departamento: string;
    public categoria:string;
    public ponentes: string;
    public poblacion: string;
    public actividad: string;

    public tipo_actividad: string;

    constructor() {
  
    }
  }
  