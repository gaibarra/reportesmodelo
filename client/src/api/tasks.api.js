import axios from "axios";

const URL = process.env.NODE_ENV === "production"
  ? import.meta.env.VITE_BACKEND_URL
  : "https://rerportes.click";

const headers = {
  'Content-Type': 'application/json',
};

const authApi = axios.create({
  baseURL: `${URL}/api`,
  headers: headers
});

export const login = async (username, password) => {
  try {
    const response = await authApi.post('/token/', { username, password });
    const { access, refresh } = response.data;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    setAuthToken(access);
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const register = async (username, password, email) => {
  try {
    const response = await authApi.post('/register/', { username, password, email });
    return response;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    await authApi.post('/logout/', { refresh: refreshToken });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthToken(null);
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Set token on initial load if available
const token = localStorage.getItem('accessToken');
if (token) {
  setAuthToken(token);
}



const tasksApi = axios.create({
  baseURL: `${URL}/tasks/api/v1/tasks`,
  headers: headers
});

const empleadosApi = axios.create({
  baseURL: `${URL}/tasks/api/v1/empleados/`,
  headers: headers
});

const eventosApi = axios.create({
  baseURL: `${URL}/tasks/api/v1/tasks`,
  headers: headers
});

export const getAllTasks = () => tasksApi.get("/");
export const getTask = (id) => tasksApi.get(`/${id}`);

export const createTask = (task) => {
  const headers = task instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
  return tasksApi.post("/", task, { headers });
};

export const updateTask = (id, task) => {
  const headers = task instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
  return tasksApi.put(`/${id}/`, task, { headers });
};

export const deleteTask = (id) => tasksApi.delete(`/${id}`);

export const getAllEmpleados = () => empleadosApi.get("/");
export const getEmpleado = (id) => empleadosApi.get(`/${id}`);
export const createEmpleado = (empleado) => empleadosApi.post("/", empleado);
export const updateEmpleado = (id, empleado) => empleadosApi.put(`/${id}/`, empleado);
export const deleteEmpleado = (id) => empleadosApi.delete(`/${id}/`);

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
