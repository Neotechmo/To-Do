import { useEffect, useReducer, useRef } from 'react'
import './App.css'
import TareasContext from './TareasContext'
import { estadoInicial, tareasReducer } from './TareasReducer'
import FormularioTarea from './components/FormularioTarea'
import FiltroTareas from './components/FiltroTareas'
import ListaTareas from './components/ListaTareas'

function App() {
  const [estado, despachador] = useReducer(tareasReducer, estadoInicial, (inicial) => {
    const tareasGuardadas = localStorage.getItem('tareasReact')
    return tareasGuardadas
      ? { ...inicial, tareas: JSON.parse(tareasGuardadas) }
      : inicial
  })

  const tituloRef = useRef(null)

  useEffect(() => {
    document.title = `Tareas: ${estado.tareas.length}`
  }, [estado.tareas.length])

  useEffect(() => {
    localStorage.setItem('tareasReact', JSON.stringify(estado.tareas))
  }, [estado.tareas])

  const agregarTarea = (titulo, descripcion) => {
    despachador({ tipo: 'AGREGAR_TAREA', titulo, descripcion })
    tituloRef.current?.focus()
  }

  const editarTarea = (id, titulo, descripcion) => {
    despachador({ tipo: 'EDITAR_TAREA', id, titulo, descripcion })
  }

  const eliminarTarea = (id) => {
    despachador({ tipo: 'ELIMINAR_TAREA', id })
  }

  const cambiarEstadoTarea = (id) => {
    despachador({ tipo: 'CAMBIAR_ESTADO', id })
  }

  const cambiarFiltro = (filtro) => {
    despachador({ tipo: 'CAMBIAR_FILTRO', filtro })
  }

  const tareasFiltradas = estado.tareas.filter((tarea) => {
    if (estado.filtro === 'completadas') return tarea.completada
    if (estado.filtro === 'pendientes') return !tarea.completada
    return true
  })

  const valorContexto = {
    tareas: estado.tareas,
    tareasFiltradas,
    filtro: estado.filtro,
    tituloRef,
    agregarTarea,
    editarTarea,
    eliminarTarea,
    cambiarEstadoTarea,
    cambiarFiltro,
  }

  return (
    <TareasContext.Provider value={valorContexto}>
      <main style={styles.contenedor}>
        <section style={styles.encabezado}>
          <div>
            
            <h1 style={styles.titulo}>Gestor de Tareas</h1>
            <p style={styles.descripcion}>
              Organiza tus pendientes, edita detalles y revisa tus avances por etapa.
            </p>
          </div>
          <div style={styles.resumen}>
            <span style={styles.numero}>{estado.tareas.length}</span>
            <span style={styles.textoResumen}>tareas registradas</span>
          </div>
        </section>

        <section className="panel-tareas">
          <FormularioTarea />
          <FiltroTareas />
          <ListaTareas />
        </section>
      </main>
    </TareasContext.Provider>
  )
}

const styles = {
  contenedor: {
    width: 'min(1100px, calc(100% - 32px))',
    margin: '0 auto',
    padding: '40px 0',
  },
  encabezado: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '26px',
    flexWrap: 'wrap',
  },
  etiqueta: {
    margin: '0 0 8px',
    color: '#0f766e',
    fontWeight: '700',
  },
  titulo: {
    margin: '0 0 10px',
    color: '#172554',
    fontSize: '42px',
  },
  descripcion: {
    margin: 0,
    color: '#475569',
    maxWidth: '620px',
  },
  resumen: {
    minWidth: '150px',
    padding: '18px',
    border: '1px solid #dbeafe',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    textAlign: 'center',
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)',
  },
  numero: {
    display: 'block',
    color: '#2563eb',
    fontSize: '34px',
    fontWeight: '800',
  },
  textoResumen: {
    color: '#475569',
    fontSize: '14px',
  },
}

export default App
