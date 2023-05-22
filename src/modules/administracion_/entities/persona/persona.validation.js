import {
    required,
    integer,
    between,
    maxLength,
    minLength,
    decimal
  } from 'vuelidate/lib/validators';
import * as mb from "@/helpers/loaders/model.load"

    export const validations = {
      persona: {
        nombre: {
          required,
        },
        apellidos: {
          required,
        },
        edad: {
          required,
          integer,
        },
        correo: {
          required,
        },
      },
    }
    export const feedbacks = {
      persona: {
      id: {
        isUnique: 'This id has been taken' 

      },
      },
    }
