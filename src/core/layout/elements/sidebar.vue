<template>
  <div class="main-sidebar sidebar-style-2">
    <aside id="sidebar-wrapper">
      <div class="sidebar-brand">
        <router-link :to="{name:'index'}"><img alt="image" src="/static/assets/img/pandora.png" class="header-logo"/>
          <span
              class="logo-name">PANDORA</span>
        </router-link>
      </div>
      <ul class="sidebar-menu">
        <li class="menu-header">Menú</li>
        <li class="dropdown" v-for="(nomenc,index) in menu" :key="index">
          <a href="javascript:void(0)" class="menu-toggle nav-link has-dropdown" v-if="nomenc.routes.length!==0"><i
              :data-feather="nomenc.icon"></i><span class="text-capitalize">{{ nomenc.name }}</span></a>
          <ul class="dropdown-menu">
            <li v-for="(route,index) in nomenc.routes" :key="index">
              <router-link :to="{name:route.name}" class="nav-link" >{{ route.caption }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import menu from './menu.json'

export default {
  name: "sidebar",
  data: () => {
    return {
      menu: menu
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
