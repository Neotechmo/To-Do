import { useContext, useState } from 'react'
import TareasContext from '../TareasContext'

function FormularioTarea() {
  const { agregarTarea, tituloRef } = useContext(TareasContext)
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [error, setError] = useState('')

  const enviarFormulario = (evento) => {
    evento.preventDefault()

    if (titulo.trim() === '' || descripcion.trim() === '') {
      setError('Escribe el titulo y la descripcion de la tarea.')
      return
    }

    agregarTarea(titulo.trim(), descripcion.trim())
    setTitulo('')
    setDescripcion('')
    setError('')
  }

  return (
    <form style={styles.formulario} onSubmit={enviarFormulario}>
      <h2 style={styles.titulo}>Nueva tarea</h2>
      <label style={styles.etiqueta} htmlFor="titulo">
        Titulo
      </label>
      <input
        ref={tituloRef}
        id="titulo"
        type="text"
        style={styles.campo}
        value={titulo}
        onChange={(evento) => setTitulo(evento.target.value)}
        placeholder="Ej. Entregar practica"
      />

      <label style={styles.etiqueta} htmlFor="descripcion">
        Descripcion
      </label>
      <textarea
        id="descripcion"
        style={{ ...styles.campo, ...styles.textarea }}
        value={descripcion}
        onChange={(evento) => setDescripcion(evento.target.value)}
        placeholder="Describe los detalles de la tarea"
      />

      {error && <p style={styles.error}>{error}</p>}

      <button style={styles.boton} type="submit">
        Agregar tarea
      </button>
    </form>
  )
}

const styles = {
  formulario: {
    padding: '22px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
  },
  titulo: {
    margin: '0 0 18px',
    color: '#172554',
  },
  etiqueta: {
    display: 'block',
    color: '#334155',
    fontWeight: '700',
    marginBottom: '8px',
  },
  campo: {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '16px',
    fontSize: '16px',
    fontFamily: 'inherit',
  },
  textarea: {
    minHeight: '130px',
    resize: 'vertical',
  },
  error: {
    margin: '0 0 14px',
    color: '#b91c1c',
    fontWeight: '700',
  },
  boton: {
    width: '100%',
    border: '0',
    borderRadius: '6px',
    padding: '12px 16px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
  },
}

export default FormularioTarea
