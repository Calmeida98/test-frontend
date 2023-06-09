<template>
    <div>
        <div class="row row-breadcrumb">
            <div class="col-md-6">
                <h4>Listado de Persona</h4>
            </div>
        </div>
        <div class="container">
            <div>
                <div class="row">
                    <div class="col-md-6">
                        <a-button-group style="margin-bottom: 10px">
                            <a-tooltip placement="topLeft" title="Eliminar elementos seleccionados">
                                <a-button icon="delete" type="danger" @click="showDeleteConfirm">Eliminar</a-button>
                            </a-tooltip>
                        </a-button-group>
                    </div>
                    <div class="col-md-6" style="text-align: end;">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <a-modal
                    @cancel="onCloseModal"
                    :title="selected_persona.get_id()?'Actualizar persona':'Añadir persona'"
                    class="modal-form"
                    width="55rem"
                    :visible="show_modal_form"
                    :destroyOnClose="true"
                    on-ok="handleOk"
                    :header="null"
                    :footer="null"
                    :maskClosable="false"
            >
                <persona_form :modal=true :model="selected_persona"/>
            </a-modal>
            <persona_table
                    :columns="columns"
                    class="col-md-8"
                    table_name="Persona"
                    id_table="id"
                    ref="persona_table"
                    :params_search="params_search"
                    :paginate="paginate"
            />

            <div class="card-body col-md-4">
                <div class="row">
                    <p class="col-md-6">Promedio:</p><p class="col-md-6">{{ promedio }}</p>
                    <p class="col-md-6">Cantidad de</p><p class="col-md-6"> personas por sexo</p>
                    <p class="col-md-6">Masculino: </p><p class="col-md-6">{{ masculino }}</p>
                    <p class="col-md-6">Femenino: </p><p class="col-md-6">{{ femenino }}</p>
                    <p class="col-md-6">Mayor Edad:</p><p class="col-md-6">{{ mayor_edad }}</p>
                    <p class="col-md-6">Menor Edad:</p><p class="col-md-6">{{ menor_edad }}</p>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import * as utils from "@/helpers/helpers/utils"
    import * as mb from "@/helpers/loaders/model.load"
    import persona_form from "../form/persona_form"
    import persona_table from "./persona.table"

    export default {
        name: "persona_list",
        provide: function () {
            return {
                close_modal: this.onCloseModal,
                set_data: this.set_data,
                show_form: this.show_form,
                load_data: () => {
                    this.$refs.persona_table.load_data()
                },
                setSelectedPersona: this.setSelectedPersona
            }
        },
        data() {
            return {
                data: [],
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                self: null,
                selected_persona: mb.instance("Persona"),
                show_modal_form: false,
                paginate: false,
                params_search: {relations: []},
                mb
            }
        },
        components: {
            persona_form,
            persona_table
        },
        computed: {
            promedio() {
                let prom = 0
                this.data.forEach(e => {
                    prom += e.edad
                })
                return Number(prom/this.data.length)
            },
            masculino() {
                let count = 0
                this.data.forEach(e => {
                    if (e.sexo === "Masculino")
                        count++
                })
                return count
            },
            femenino() {
                let count = 0
                this.data.forEach(e => {
                    if (e.sexo === "Femenino")
                        count++
                })
                return count;
            },
            columns() {
                return this.width > 600 ? mb.statics("Persona").show_columns([], false) : mb.statics("Persona").show_columns(["apellidos", "edad"], false)
            },
            mayor_edad() {
                let edad = 0
                let person = {}
                this.data.forEach(e => {
                    if (e.edad > edad) {
                        edad = e.edad
                        person = e
                    }
                })
                return person.nombre + " " + person.apellidos
            },
            menor_edad() {
                let edad = 100000
                let person = {}
                this.data.forEach(e => {
                    if (e.edad < edad) {
                        edad = e.edad
                        person = e
                    }
                })
                return person.nombre + " " + person.apellidos
            },
        },
        mounted() {
            window.addEventListener('resize', this.getDimensions);
        },
        unmounted() {
            window.removeEventListener('resize', this.getDimensions);
        },
        methods: {
            getDimensions() {
                console.log(document.documentElement.clientWidth)
                this.width = document.documentElement.clientWidth;
                this.height = document.documentElement.clientHeight;
            },
            set_data(data) {
                this.data = data
            },
            setSelectedPersona(model) {
                this.selected_persona = model
            },
            onCloseModal(e, reload_data = false) {
                this.selected_persona = mb.instance("Persona")
                this.show_modal_form = false
                reload_data ? this.$refs.persona_table.load_data() : ""
            },
            show_form() {
                this.show_modal_form = !this.show_modal_form
            },
            showDeleteConfirm() {
                if (this.$refs.persona_table.selectedRowKeys.length === 0) {
                    utils.openNotificationWithIcon(
                        "error",
                        "Eliminar elementos seleccionados",
                        "Debe seleccionar al menos un elemento"
                    )
                    return
                }
                let _this = this
                this.$confirm({
                    title: "Eliminar elementos seleccionados?",
                    icon: "delete",
                    // icon:()=>{return ( <a-icon type="delete" style="color:red"/> )},
                    okText: "Si",
                    okType: "danger",
                    class: "delete_confirm",
                    cancelText: "No",
                    async onOk() {
                        try {
                            const response = await mb.statics("Persona").delete_by_ids(
                                _this.$refs.persona_table.selectedRowKeys
                            )
                            utils.process_response(response, "deleted")
                            _this.$refs.persona_table.selectedRowKeys = []
                            _this.$refs.persona_table.load_data()
                        } catch (error) {
                            utils.process_error(error)
                            _this.$refs.persona_table.selectedRowKeys = []
                        }
                    },
                    onCancel() {
                    }
                })
            },
        },
    }
</script>

<style>
    @import "persona_list.css";
</style>

