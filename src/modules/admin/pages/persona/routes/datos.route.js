export default [
    {
        path: '/admin/persona_list',
        name: 'persona_list',
        component:()=> import('@/modules/admin/pages/persona/list/persona_list.vue'),
    },
    {
        path: '/admin/persona_form',
        name: 'persona_form',
        component:()=> import('@/modules/admin/pages/persona/form/persona_form.vue'),
    },
]
