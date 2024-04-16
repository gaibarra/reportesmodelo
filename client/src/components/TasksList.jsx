import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";

export function TasksList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      // Convertir las fechas a instancias de Date
      const tasksWithDates = res.data.map(task => ({
        ...task,
        fecha_creacion: new Date(task.fecha_creacion),
        fecha_resolucion: task.fecha_resolucion ? new Date(task.fecha_resolucion) : null,
      }));
      setTasks(tasksWithDates);
    }
    loadTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}