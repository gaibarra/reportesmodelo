import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { TaskFormPage } from "./pages/TaskFormPage";
import { TasksPage } from "./pages/TasksPage";
import { Toaster } from "react-hot-toast";
import EmpleadoPage from './pages/EmpleadoPage';
import { EventosFormPage } from './pages/EventosFormPage';


function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          {/* redirect to tasks */}
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:id" element={<TaskFormPage />} />
          <Route path="/tasks-create" element={<TaskFormPage />} />
          <Route path="/empleados" element={<EmpleadoPage />} />
          <Route path="/empleados/:id" element={<EmpleadoPage />} />
          <Route path="/eventos/:id" element={<EventosFormPage />} />
          
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;