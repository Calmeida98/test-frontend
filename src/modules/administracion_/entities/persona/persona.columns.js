  export const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      align:'center',
      key: 'nombre',

      sorter: (a, b) =>  (a.nombre > b.nombre)-(a.nombre < b.nombre)
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      align:'center',
      key: 'apellidos',

      sorter: (a, b) =>  (a.apellidos > b.apellidos)-(a.apellidos < b.apellidos)
    },
    {
      title: 'Edad',
      dataIndex: 'edad',
      align:'center',
      key: 'edad',

      sorter: (a, b) => a.edad - b.edad
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      align:'center',
      key: 'correo',

      sorter: (a, b) =>  (a.correo > b.correo)-(a.correo < b.correo)
    },
    {
      title: 'Acciones',
      key: 'action_elements',
      fixed: 'right',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ];
