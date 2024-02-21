import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, deleteTask, getTask, updateTask } from "../api/tasks.api";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function TaskFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [initialImage, setInitialImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [fechaResolucion, setFechaResolucion] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (
        (key === "foto_inicial" || key === "foto_final") &&
        data[key].length > 0
      ) {
        formData.append(key, data[key][0]);
      } else if (key !== "foto_inicial" && key !== "foto_final") {
        formData.append(key, data[key]);
      }
    });

    if (fechaResolucion) {
      formData.append("fecha_resolucion", fechaResolucion.toISOString().split('T')[0]);
    }

    if (!data.title) {
      toast.error("Title is required", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
      return;
    }

    try {
      if (params.id) {
        await updateTask(params.id, formData);
        toast.success("Task updated", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
      } else {
        await createTask(formData);
        toast.success("New Task Added", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
      }

      navigate("/tasks");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
  });

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    toast(`La zona horaria detectada es ${timeZone}`, {
      position: "bottom-right",
      style: {
        background: "#101010",
        color: "#fff",
      },
    });
    async function loadTask() {
      if (params.id) {
        const { data } = await getTask(params.id);
        setValue("title", data.title);
        setValue("description", data.description);
        setValue("done", data.done);
        if (data.fecha_resolucion) {
          setFechaResolucion(new Date(data.fecha_resolucion));
        }
        setInitialImage(data.foto_inicial);
        setFinalImage(data.foto_final);
      }
    }
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={onSubmit}
        className="bg-zinc-800 p-10 rounded-lg mt-2"
        encType="multipart/form-data"
      >
        <input
          {...register("title", { required: true })}
          placeholder="Título"
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>Title is required</span>}

        <textarea
          {...register("description", { required: true })}
          placeholder="Descripción"
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.description && <span>Description is required</span>}

        {initialImage && (
          <img
            src={initialImage}
            alt="Foto inicial"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        )}

        <input
          type="file"
          {...register("foto_inicial")}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        <label htmlFor="fecha_resolucion" className="block mb-1">
          Fecha de Resolución
        </label>
        <DatePicker 
          selected={fechaResolucion} 
          onChange={date => setFechaResolucion(date)} 
          dateFormat="dd/MM/yyyy"
          className="bg-zinc-700 p-3 rounded-lg block w-50% mb-3"
          style={{ border: "2px solid red", backgroundColor: "#808080" }}
        />
        {errors.fecha_resolucion && (
          <span>Fecha de Resolución is required</span>
        )}
        {finalImage && (
          <img
            src={finalImage}
            alt="Foto final"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        )}
        <input
          type="file"
          {...register("foto_final")}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />

        <input
          type="checkbox"
          {...register("done")}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />

        <button
          type="submit"
          className="bg-blue-500 p-3 rounded-lg block w-full text-white font-bold"
        >
          Guardar
        </button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm(
                "Estás seguro de eliminar este Reporte?"
              );
              if (accepted) {
                await deleteTask(params.id);
                toast.success("Reporte eliminado", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/tasks");
              }
            }}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}