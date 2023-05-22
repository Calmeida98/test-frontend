<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading"/>
    <div class="card-body p-0">

      <tc-form
          :feedbacks="mb.statics('Persona').feedbacks"
          :vobject="$v"
          nested="persona"
          ref="form"
          class="form-row"
      >
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Nombre<span class='required_field'>*</span></label>
          <tc-input placeholder='Ingrese el valor' name='nombre' v-model="persona.nombre"></tc-input>
        </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Apellidos<span class='required_field'>*</span></label>
          <tc-input placeholder='Ingrese el valor' name='apellidos' v-model="persona.apellidos"></tc-input>
        </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Edad<span class='required_field'>*</span></label>
          <tc-input placeholder='Ingrese el valor' type_car='num' name='edad' v-model="persona.edad"></tc-input>
        </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Sexo<span class='required_field'>*</span></label>
          <tc-autocomplete
              placeholder="Seleccione el Sexo"
              name="sexo"
              ref="select_role"
              :successFeed="false"
              idKey="sexo"
              textKey="sexo"
              :defaultValue="persona.sexo"
              v-model="persona.sexo"
              :data-source="sexo"
          />
        </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Correo<span class='required_field'>*</span></label>
          <tc-input placeholder='Ingrese el valor' name='correo' v-model="persona.correo"></tc-input>
        </tc-form-item>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <a-button-group style="margin-bottom: 10px;margin-top: 10px">
        <a-tooltip placement="topLeft" :title="!persona.get_id()  ? 'Insertar nuevo elemento':'Insertar elemento'">
          <a-button :disabled="loading" type="primary" @click="save_model()">{{ button_text }}</a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="Cancelar acción">
          <a-button style="background-color: red " :disabled="loading" type="danger" @click="cancel()">Cancel</a-button>
        </a-tooltip>
      </a-button-group>
    </div>
  </div>
</template>

<script>
import * as utils from "@/helpers/helpers/utils"
import * as mb from "@/helpers/loaders/model.load"

export default {
  name: "persona_form",
  inject: {
    close_modal: {
      default: () => {
      }
    },
    load_data: {
      default: () => {
      }
    },
    refresh: {
      default: () => {
      }
    }
  },
  props: {
    model: {
      type: Object,
      default: () => {
      }
    },
    modal: {
      type: Boolean,
      default: false
    },
    popoverPlacement: {
      type: String,
      default: "bottomLeft"
    }
  },
  validations: mb.statics("Persona").validations,
  data() {
    return {
      loading: false,
      sexo: [{sexo: "Masculino"}, {sexo: "Femenino"}],
      mb,      // This property is for load static or instance class
      persona: mb.instance("Persona"),
    }
  },
  computed: {
    personaFeedbacks() {
      return mb.statics("Persona").feedbacks
    },
    button_text() {
      return this.persona.get_id() ? "Actualizar" : "Insertar"
    },
  },

  mounted: function () {
    this.persona = mb.instance("Persona", this.model)
  },
  components: {},
  methods: {
    cancel() {
      if (!this.model) {
        this.$emit("close_modal", false)
      } else {
        this.modal ? this.close_modal(null, false) : this.$router.push({name: "persona_list"})
      }
    },
    save_model(and_new = false) {
      if (this.$refs.form.validate()) {
        this.loading = true
        const accion = this.persona.get_id() ? "actualizado" : "añadido"
        this.persona
            .save()
            .then((response) => {
              utils.process_response(response, accion)
              this.persona = mb.instance("Persona",{})
              this.refresh()
              this.$refs.form.vobject.$reset()
              this.loading = false
            })
            .catch((error) => {
              this.loading = false
              utils.process_error(error)
            })
      }
    }
  }
}
</script>

<style scoped>
@import "persona_form.css";
</style>

