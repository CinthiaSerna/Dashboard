import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";

export const Dashboard = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [tareaEditada, setTareaEditada] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    obtenerTareas();
  }, []);

  const obtenerTareas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tareas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTareas(response.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  // ---------------------------------------------------------------------------

  const agregarTarea = async () => {
    if (!nuevaTarea.trim()) return;
    try {
      const response = await axios.post(
        "http://localhost:5000/tareas",
        { texto: nuevaTarea },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTareas([...tareas, response.data]);
      setNuevaTarea("");
    } catch (error) {
      console.error("Error al agregar la nueva tarea:", error);
    }
  };

  // ---------------------------------------------------------------------------

  const editarTarea = async (id, nuevoTexto) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/tareas/${id}`,
        { texto: nuevoTexto },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTareas(
        tareas.map((tarea) => (tarea.id === id ? response.data : tarea))
      );
      setTareaEditada(null);
      setTextoEditado("");
    } catch (error) {
      console.error("Error al editar la tarea:", error);
    }
  };

  // ---------------------------------------------------------------------------

  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tareas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // ---------------------------------------------------------------------------

  const finalizarTarea = async (id) => {
    try {
      const tarea = tareas.find((tarea) => tarea.id === id);
      await axios.put(
        `http://localhost:5000/tareas/${id}`,
        { finalizada: !tarea.finalizada },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTareas(
        tareas.map((tarea) =>
          tarea.id === id ? { ...tarea, finalizada: !tarea.finalizada } : tarea
        )
      );
    } catch (error) {
      console.error("Error al finalizar la tarea:", error);
    }
  };

  // ---------------------------------------------------------------------------

  const contarTareasFinalizadas = () => {
    return tareas.filter((tarea) => tarea.finalizada).length;
  };

  const contarTareasNoFinalizadas = () => {
    return tareas.filter((tarea) => !tarea.finalizada).length;
  };

  const totalTareas = tareas.length;
  const tareasFinalizadas = contarTareasFinalizadas();
  const porcentajeFinalizadas =
    totalTareas === 0 ? 0 : (tareasFinalizadas / totalTareas) * 100;

  return (
    <div className="formulario">
      <div className="metricas-container">
        <div className="metricas">
          <p>Total de tareas: {totalTareas}</p>
          <div className="porcentaje-tareas">
            <p>Tareas finalizadas: {tareasFinalizadas}</p>
            <p>Tareas por Finalizar: {contarTareasNoFinalizadas()}</p>
          </div>
        </div>
        <div className="barra-container">
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "50px",
            borderRadius: "50px",
            border: "4px dotted #3B1E54",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${porcentajeFinalizadas}%`,
              height: "100%",
              backgroundColor: "#CDC1FF",
              borderRadius: "50px",
              transition: "width 0.5s ease-in-out",
            }}
          ></div>
        </div>
        </div>
      </div>
      <div className="agregarTarea-container">
        <div className="agregar-tarea">
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Que tareas hay para hoy?"
          />
          <button onClick={agregarTarea}>Agregar</button>
        </div>
      </div>
      <ul>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            style={{
              textDecoration: tarea.finalizada ? "line-through" : "none",
            }}
          >
            {tareaEditada === tarea.id ? (
              <>
                <input
                  type="text"
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                />
                <button onClick={() => editarTarea(tarea.id, textoEditado)}>Guardar</button>
                <button onClick={() => setTareaEditada(null)}>Cancelar</button>
              </>
              ) : (
              <>
                {tarea.texto}
                <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                <button onClick={() => {
                  setTareaEditada(tarea.id);
                  setTextoEditado(tarea.texto);
                }}>Editar</button>
                <button onClick={() => finalizarTarea(tarea.id)}>
                  {tarea.finalizada ? "Desmarcar" : "Finalizar"}  
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
