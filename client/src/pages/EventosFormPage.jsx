import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { getEventos, createEvento, getAllEmpleados, getTask } from "../api/tasks.api";

export function EventosFormPage() {
  const params = useParams();
  const [events, setEvents] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [newEvent, setNewEvent] = useState({
    descripcion: "",
    reporte: params.id,
    empleado: null,
  });
  const [isEventRegistered, setIsEventRegistered] = useState(false);
  const [task, setTask] = useState(null);

  const loadTask = useCallback(async () => {
    const { data } = await getTask(params.id);
    setTask(data);
  }, [params.id]);

  const loadEvents = useCallback(async () => {
    const { data } = await getEventos(params.id);
    setEvents(data);
  }, [params.id]);

  const loadEmpleados = useCallback(async () => {
    const { data } = await getAllEmpleados();
    setEmpleados(data);
  }, []);

  useEffect(() => {
    loadEvents();
    loadEmpleados();
    loadTask();
  }, [loadEvents, loadEmpleados, loadTask]);

  async function handleEventSubmit(e) {
    e.preventDefault();

    if (!newEvent.descripcion || !newEvent.empleado) {
      alert("Por favor, rellena todos los campos del formulario.");
      return;
    }

    const empleadoObj = empleados.find((emp) => emp.id === newEvent.empleado);

    if (empleadoObj) {
      const eventoWithEmpleadoObj = {
        ...newEvent,
        empleado_id: empleadoObj.id,
      };

      const response = await createEvento(params.id, eventoWithEmpleadoObj);

      if (response.status === 200) {
        setIsEventRegistered(true);
      }

      setNewEvent({
        descripcion: "",
        reporte: params.id,
        empleado: "",
      });
      loadEvents();
    } else {
      alert("Empleado no encontrado. Por favor, selecciona un empleado válido.");
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      {isEventRegistered && <p>Avance registrado</p>}
      <form onSubmit={handleEventSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
        {task && <h1 className="text-2xl font-bold mb-3">{task.title}</h1>}
        {task && (
          <h3 className="text mb-3">
            Registrar avance de: {task.description}
          </h3>
        )}
        <textarea
          value={newEvent.descripcion}
          onChange={(e) => setNewEvent({ ...newEvent, descripcion: e.target.value })}
          placeholder="Descripción del avance o Comentario"
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        <select
          value={newEvent.empleado || ""}
          onChange={(e) => {
            const empleadoSeleccionado = e.target.value ? Number(e.target.value) : null;
            setNewEvent({ ...newEvent, empleado: empleadoSeleccionado });
          }}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        >
          <option value="">Persona que reporta</option>
          {empleados &&
            empleados.map((empleado) => (
              <option key={empleado.id} value={empleado.id}>
                {empleado.nombre_empleado}
              </option>
            ))}
        </select>
        <button type="submit" className="bg-blue-500 p-3 rounded-lg block w-full text-white font-bold">
          Guardar
        </button>
      </form>
      <div className="mt-10 grid grid-cols-1 gap-4">
        {events
          .filter((event) => Number(event.reporte) === Number(params.id))
          .map((event, index) => {
            const empleado = empleados.find((empleado) => String(empleado.id) === String(event.empleado));

            const fecha = new Date(event.fecha).toLocaleString("es-ES", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            const nombreEmpleado = empleado ? empleado.nombre_empleado : "Empleado no encontrado";

            const datos = [nombreEmpleado, fecha, event.descripcion].join(" - ");

            return (
              <div key={index} className="bg-zinc-800 p-3 rounded-lg mb-3">
                {datos}
              </div>
            );
          })}
      </div>
    </div>
  );
}
