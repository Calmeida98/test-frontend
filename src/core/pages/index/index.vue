<template>
  <div class="mx-100">
    <persona_form/>
    <persona_list ref="persona_list"/>
  </div>
</template>

<script>
import Persona_form from "@modules/admin/pages/persona/form/persona_form.vue"
import Persona_list from "@modules/admin/pages/persona/list/persona_list.vue"

export default {
  name: "index",
  components: {Persona_list,Persona_form},
  provide: function () {
    return {
      refresh: this.refresh,
    }
  },
  methods:{
    refresh(){
      this.$refs.persona_list.$refs.persona_table.load_data();
    }
  }
}
</script>

<style scoped>

</style>

