<template>
    <div id="app">
        <div class="main-wrapper main-wrapper-1">
            <!-- Main Content -->
            <div class="main-content">
                <section class="section">
                    <div class="section-body">
                        <router-view/>
                    </div>
                </section>
                <setting-sidebar/>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Navbar from "@/core/layout/elements/navbar";
    import Sidebar from "@/core/layout/elements/sidebar";
    import SettingSidebar from "@/core/layout/elements/settingSidebar";
    import FooterPandora from "@/core/layout/elements/footerPandora";

    export default {
        name: 'home',
        props: {
            logout: Function
        },
        data() {
            return {}
        },
        components: {FooterPandora, SettingSidebar, Sidebar, Navbar},
        beforeCreate() {
        },
        created() {
        },
        beforeDestroy() {
            const recaptchaScripts = document.querySelectorAll('script')
            for (let i = 0; i < recaptchaScripts.length; i += 1) {
                recaptchaScripts[i].parentElement.removeChild(recaptchaScripts[i])
            }
        },
        async beforeMount() {
            Promise.all([
                //Ponga todos los javascripts del template
                Vue.loadScript('/static/assets/js/app.min.js').then(() => {
                    Vue.loadScript('/static/assets/js/scripts.js')
                    Vue.loadScript('/static/assets/js/custom.js')
                }),

            ])
        }
    }
</script>
