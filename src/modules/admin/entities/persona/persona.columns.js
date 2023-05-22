import axios_service from "@/config/axios/axios_service"

export const columns = [
    {
        title: "Nombre",
        dataIndex: "nombre",
        align: "center",
        key: "nombre",

        sorter: (a, b) => (a.nombre > b.nombre) - (a.nombre < b.nombre)
    },
    {
        title: "Apellidos",
        dataIndex: "apellidos",
        align: "center",
        key: "apellidos",

        sorter: (a, b) => (a.apellidos > b.apellidos) - (a.apellidos < b.apellidos)
    },
    // {
    //     title: "Nacionalidad",
    //     dataIndex: "nacionalidad",
    //     align: "center",
    //     key: "nacionalidad",
    //     customRender(value,object) {
    //         console.log(object);
    //         // return axios_service.get('/?name=')
    //     },
    //     sorter: (a, b) => (a.nacionalidad > b.nacionalidad) - (a.nacionalidad < b.nacionalidad)
    // },
    {
        title: "Edad",
        dataIndex: "edad",
        align: "center",
        key: "edad",

        sorter: (a, b) => a.edad - b.edad
    },
    {
        title: "Sexo",
        dataIndex: "sexo",
        align: "center",
        key: "sexo",

        sorter: (a, b) => (a.sexo > b.sexo) - (a.sexo < b.sexo)
    },
    {
        title: "Correo",
        dataIndex: "correo",
        align: "center",
        key: "correo",

        sorter: (a, b) => a.correo - b.correo
    },
    {
        title: "Acciones",
        key: "action_elements",
        fixed: "right",
        scopedSlots: {
            customRender: "action"
        }
    }
]
