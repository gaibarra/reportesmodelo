import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "reportesmodelo.vercel.app";

export const getAllTasks = () => tasksApi.get("/");

export const getTask = (id) => tasksApi.get(`/${id}`);

export const createTask = (task) => tasksApi.post("/", task);

export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);

export const deleteTask = (id) => tasksApi.delete(`/${id}`);


const empleadosApi = axios.create({
  baseURL: `${URL}/tasks/api/v1/empleados/`, // Cambia la URL base aquí
});

export const getAllEmpleados = () => empleadosApi.get("/");

export const getEmpleado = (id) => empleadosApi.get(`/${id}`);

export const createEmpleado = (empleado) => empleadosApi.post("/", empleado);

export const updateEmpleado = (id, empleado) => empleadosApi.put(`/${id}/`, empleado);

export const deleteEmpleado = (id) => empleadosApi.delete(`/${id}/`);

const eventosApi = axios.create({
  baseURL: `${URL}/tasks/api/v1/tasks`, // Cambia la URL base aquí
});

export const getEventos = async (taskId) => {
  try {
    const response = await eventosApi.get(`/${taskId}/eventos`);
    return response;
  } catch (error) {
    console.error('Error fetching eventos:', error);
    throw error;
  }
};

export const createEvento = async (taskId, evento) => {
  try {
    const response = await eventosApi.post(`/${taskId}/eventos/`, evento);
    return response;
  } catch (error) {
    console.error('Error creating evento:', error);
    throw error;
  }
};

export const updateEvento = async (taskId, eventId, evento) => {
  try {
    const response = await eventosApi.put(`/${taskId}/eventos/${eventId}/`, evento);
    return response;
  } catch (error) {
    console.error('Error updating evento:', error);
    throw error;
  }
};

export const deleteEvento = async (taskId, eventId) => {
  try {
    const response = await eventosApi.delete(`/${taskId}/eventos/${eventId}/`);
    return response;
  } catch (error) {
    console.error('Error deleting evento:', error);
    throw error;
  }
};