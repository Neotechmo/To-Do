import { useContext } from 'react'
import TareasContext from '../TareasContext'
import Tarea from './Tarea'

function ListaTareas() {
  const { tareasFiltradas } = useContext(TareasContext)

  if (tareasFiltradas.length === 0) {
    return <p style={styles.vacio}>No hay tareas para mostrar con este filtro.</p>
  }

  return (
    <div style={styles.lista}>
      {tareasFiltradas.map((tarea) => (
        <Tarea key={tarea.id} tarea={tarea} />
      ))}
    </div>
  )
}

const styles = {
  lista: {
    display: 'grid',
    gap: '16px',
  },
  vacio: {
    padding: '24px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    border: '1px dashed #94a3b8',
    color: '#475569',
    textAlign: 'center',
  },
}

export default ListaTareas
