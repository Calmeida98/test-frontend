/**Generate by ASGENS
*@author Charlietyn 
*@date Wed May 17 17:20:57 GMT-04:00 2023  
*@time Wed May 17 17:20:57 GMT-04:00 2023  
*/
  import BaseModel from '@/core/base/base.model';

  import * as columns from './persona.columns';

  import * as validation from './persona.validation';

  const url = 'admin/persona';

    export default class Persona extends BaseModel {
       id
       nombre
       apellidos
       edad
       sexo
       correo

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id = attributes.id|| undefined
        this.nombre = attributes.nombre|| null
        this.apellidos = attributes.apellidos|| null
        this.edad = attributes.edad|| null
        this.sexo = attributes.sexo|| null
        this.correo = attributes.correo|| null
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id = attributes.id
        this.nombre = attributes.nombre
        this.apellidos = attributes.apellidos
        this.edad = attributes.edad
        this.sexo = attributes.sexo
        this.correo = attributes.correo
      }
    }

    static validations = validation.validations

    static feedbacks = validation.feedbacks

  static columns = columns.columns

    static get url() {
      return url
    };
  
    get url() {
      return url
    };
  
    get_id() {
      return this.id;
    }
    class_name() {
        return 'Persona'
      }
  

   }

