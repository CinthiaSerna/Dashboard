import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"; 
import flecha from '../../img/flecha-curva.png';
import flecha2 from '../../img/flecha-curva2.png';
import titulo from '../../img/titulo.png';


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
  const porcentajeFinalizadas = totalTareas === 0 ? 0 : Math.floor((tareasFinalizadas / totalTareas) * 100);

  return (
    <div className="formulario">
      <img src={titulo} alt="titulo" style={{
        width: "600px", 
        height: "200px", 
        marginLeft: "1230px",
        position: "absolute",
        marginTop: "-500px",
        zIndex: 9999}} />
      <div className="metricas-container">
        <div className="metricas">
          <p style={{fontSize: "40px", backgroundColor: "#FAF4B7", borderRadius: "50px", border: "4px solid #ECC5FB"}}>Total de tareas: {totalTareas}</p>
          <div className="porcentaje-tareas">
            <p>Tareas finalizadas: {tareasFinalizadas}</p>
            <p>Tareas por Finalizar: {contarTareasNoFinalizadas()}</p>
          </div>
          <img src={flecha} alt="flecha" style={{
            width: "100px", 
            height: "100px", 
            animation: "balanceo 1s ease-in-out infinite alternate",
            position: "absolute",
            marginRight: "360px",
            top: "400px",
            }} />
          <img src={flecha2} alt="flecha" style={{
            width: "100px", 
            height: "100px", 
            animation: "balanceo 1s ease-in-out infinite alternate",
            position: "absolute",
            marginLeft: "360px",
            top: "400px",
            }} />  
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
        <p style={{
          fontSize: "30px",
          textAlign: "center",
          width: "50px",  
          position: "absolute",
          left: "880px",  
          top: "380px",
        }}>{porcentajeFinalizadas}%</p>
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
      <div className="contenedor-lista">
        <ul>
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              style={{
                textDecoration: tarea.finalizada ? "line-through" : "none",
              }}
            >
              <div className="boton-finalizar">
                <button onClick={() => finalizarTarea(tarea.id)}>
                  {tarea.finalizada ? <FaTimes size={20} color="#F38C79" /> : <FaCheck size={20} color="#A0C878" />}
                </button>
              </div>
              {tareaEditada === tarea.id ? (
                <>
                  <input 
                    type="text"
                    className="input-editar"
                    value={textoEditado}
                    onChange={(e) => setTextoEditado(e.target.value)}
                  />
                  <button onClick={() => editarTarea(tarea.id, textoEditado)}>
                    <FaCheck size={18} color="#5DB996" />
                  </button>
                  <button onClick={() => setTareaEditada(null)}>
                    <FaTimes size={18} color="#D84040" />
                  </button>
                </>
                ) : (
                <>
                  <span className="texto-tarea">{tarea.texto}</span>
                  <div className="botones-tarea">
                    <button onClick={() => eliminarTarea(tarea.id)}>
                      <FaTrash size={20} color="#BF3131" />
                    </button>
                    <button onClick={() => {
                      setTareaEditada(tarea.id);
                      setTextoEditado(tarea.texto);
                    }}>
                      <FaEdit size={20} color="#7886C7" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
