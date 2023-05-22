export default [
    {
        path: '/administracion_/persona_list',
        name: 'persona_list',
        component:()=> import('@/modules/administracion_/pages/persona/list/persona_list.vue'),
    },
    {
        path: '/administracion_/persona_form',
        name: 'persona_form',
        component:()=> import('@/modules/administracion_/pages/persona/form/persona_form.vue'),
    },
]
