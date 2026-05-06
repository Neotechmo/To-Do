import { useContext, useState } from 'react'
import TareasContext from '../TareasContext'

function Tarea({ tarea }) {
  const { editarTarea, eliminarTarea, cambiarEstadoTarea } = useContext(TareasContext)
  const [editando, setEditando] = useState(false)
  const [tituloEditado, setTituloEditado] = useState(tarea.titulo)
  const [descripcionEditada, setDescripcionEditada] = useState(tarea.descripcion)

  const guardarCambios = (evento) => {
    evento.preventDefault()

    if (tituloEditado.trim() === '' || descripcionEditada.trim() === '') return

    editarTarea(tarea.id, tituloEditado.trim(), descripcionEditada.trim())
    setEditando(false)
  }

  const cancelarEdicion = () => {
    setTituloEditado(tarea.titulo)
    setDescripcionEditada(tarea.descripcion)
    setEditando(false)
  }

  const estiloTarjeta = tarea.completada
    ? { ...styles.tarjeta, ...styles.completada }
    : styles.tarjeta

  return (
    <article style={estiloTarjeta}>
      {editando ? (
        <form style={styles.formularioEdicion} onSubmit={guardarCambios}>
          <input
            style={styles.campo}
            value={tituloEditado}
            onChange={(evento) => setTituloEditado(evento.target.value)}
          />
          <textarea
            style={{ ...styles.campo, ...styles.textarea }}
            value={descripcionEditada}
            onChange={(evento) => setDescripcionEditada(evento.target.value)}
          />
          <div style={styles.acciones}>
            <button style={styles.botonPrimario} type="submit">
              Guardar
            </button>
            <button style={styles.botonSecundario} type="button" onClick={cancelarEdicion}>
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <>
          <div style={styles.contenido}>
            <span style={tarea.completada ? styles.estadoCompletada : styles.estadoPendiente}>
              {tarea.completada ? 'Completada' : 'Pendiente'}
            </span>
            <h3 style={tarea.completada ? styles.tituloCompletado : styles.titulo}>
              {tarea.titulo}
            </h3>
            <p style={tarea.completada ? styles.descripcionCompletada : styles.descripcion}>
              {tarea.descripcion}
            </p>
          </div>
          <div style={styles.acciones}>
            <button style={styles.botonPrimario} type="button" onClick={() => cambiarEstadoTarea(tarea.id)}>
              {tarea.completada ? 'Marcar pendiente' : 'Completar'}
            </button>
            <button style={styles.botonSecundario} type="button" onClick={() => setEditando(true)}>
              Editar
            </button>
            <button style={styles.botonEliminar} type="button" onClick={() => eliminarTarea(tarea.id)}>
              Eliminar
            </button>
          </div>
        </>
      )}
    </article>
  )
}

const styles = {
  tarjeta: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.07)',
  },
  completada: {
    backgroundColor: '#ecfdf5',
    borderColor: '#99f6e4',
  },
  contenido: {
    marginBottom: '16px',
  },
  estadoPendiente: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '6px',
    color: '#92400e',
    backgroundColor: '#fef3c7',
    fontWeight: '800',
    fontSize: '13px',
    marginBottom: '10px',
  },
  estadoCompletada: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '6px',
    color: '#065f46',
    backgroundColor: '#ccfbf1',
    fontWeight: '800',
    fontSize: '13px',
    marginBottom: '10px',
  },
  titulo: {
    margin: '0 0 8px',
    color: '#172554',
  },
  tituloCompletado: {
    margin: '0 0 8px',
    color: '#0f766e',
    textDecoration: 'line-through',
  },
  descripcion: {
    margin: 0,
    color: '#475569',
    whiteSpace: 'pre-wrap',
  },
  descripcionCompletada: {
    margin: 0,
    color: '#64748b',
    whiteSpace: 'pre-wrap',
    textDecoration: 'line-through',
  },
  acciones: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  botonPrimario: {
    border: '0',
    borderRadius: '6px',
    padding: '10px 12px',
    backgroundColor: '#0f766e',
    color: '#ffffff',
    fontWeight: '800',
    cursor: 'pointer',
  },
  botonSecundario: {
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    padding: '10px 12px',
    backgroundColor: '#f8fafc',
    color: '#172554',
    fontWeight: '800',
    cursor: 'pointer',
  },
  botonEliminar: {
    border: '0',
    borderRadius: '6px',
    padding: '10px 12px',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    fontWeight: '800',
    cursor: 'pointer',
  },
  formularioEdicion: {
    display: 'grid',
    gap: '12px',
  },
  campo: {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    padding: '11px',
    fontSize: '16px',
    fontFamily: 'inherit',
  },
  textarea: {
    minHeight: '100px',
    resize: 'vertical',
  },
}

export default Tarea
