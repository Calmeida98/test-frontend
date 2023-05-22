import {
    required,
    integer,
    between,
    maxLength,
    minLength,
    decimal,
    email
} from "vuelidate/lib/validators"
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
        sexo: {
            required,
        },
        correo: {
            required,
            email,
            async isUnique(value, object) {
                if (!value)
                    return true
                const _specific = true
                const {id, correo} = object
                const _scenario = id ? "update" : "create"
                const params = {id, correo}
                const validation = await mb.statics("Persona").validate({...params, _scenario, _specific})
                return !validation.data ? false : validation.data.success
            }
        },
    },
}
export const feedbacks = {
    persona: {
        correo: {
            isUnique: "This correo has been taken"

        },
        id: {
            isUnique: "This id has been taken"

        },
    },
}
