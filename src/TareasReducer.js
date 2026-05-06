const estadoInicial = {
  tareas: [
    {
      id: 1,
      titulo: 'Repasar componentes',
      descripcion: 'Practicar props, eventos y renderizado condicional.',
      completada: false,
    },
    {
      id: 2,
      titulo: 'Construir version de produccion',
      descripcion: 'Ejecutar npm run build antes de comprimir el proyecto.',
      completada: true,
    },
  ],
  filtro: 'todas',
}

function tareasReducer(estado, accion) {
  switch (accion.tipo) {
    case 'AGREGAR_TAREA': {
      const nuevaTarea = {
        id: Date.now(),
        titulo: accion.titulo,
        descripcion: accion.descripcion,
        completada: false,
      }
      return { ...estado, tareas: [nuevaTarea, ...estado.tareas] }
    }
    case 'EDITAR_TAREA': {
      const tareasActualizadas = estado.tareas.map((tarea) =>
        tarea.id === accion.id
          ? { ...tarea, titulo: accion.titulo, descripcion: accion.descripcion }
          : tarea,
      )
      return { ...estado, tareas: tareasActualizadas }
    }
    case 'ELIMINAR_TAREA': {
      return {
        ...estado,
        tareas: estado.tareas.filter((tarea) => tarea.id !== accion.id),
      }
    }
    case 'CAMBIAR_ESTADO': {
      const tareasActualizadas = estado.tareas.map((tarea) =>
        tarea.id === accion.id
          ? { ...tarea, completada: !tarea.completada }
          : tarea,
      )
      return { ...estado, tareas: tareasActualizadas }
    }
    case 'CAMBIAR_FILTRO': {
      return { ...estado, filtro: accion.filtro }
    }
    default: {
      return estado
    }
  }
}

export { estadoInicial, tareasReducer }
