import { useContext } from 'react'
import TareasContext from '../TareasContext'

function FiltroTareas() {
  const { filtro, tareasFiltradas, cambiarFiltro } = useContext(TareasContext)

  return (
    <div style={styles.barra}>
      <div>
        <label style={styles.etiqueta} htmlFor="filtro">
          Filtrar tareas
        </label>
        <select
          id="filtro"
          style={styles.select}
          value={filtro}
          onChange={(evento) => cambiarFiltro(evento.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="pendientes">Pendientes</option>
          <option value="completadas">Completadas</option>
        </select>
      </div>
      <p style={styles.contador}>
        {tareasFiltradas.length} tareas en esta categoria
      </p>
    </div>
  )
}

const styles = {
  barra: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    gap: '16px',
    padding: '18px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    marginBottom: '18px',
    flexWrap: 'wrap',
  },
  etiqueta: {
    display: 'block',
    color: '#334155',
    fontWeight: '700',
    marginBottom: '8px',
  },
  select: {
    minWidth: '190px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#f8fafc',
    color: '#172554',
  },
  contador: {
    margin: 0,
    color: '#0f766e',
    fontWeight: '800',
  },
}

export default FiltroTareas
