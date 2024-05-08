import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, deleteTask, getTask, updateTask } from "../api/tasks.api";
import { toast } from "react-hot-toast";
import moment from "moment";

export function TaskFormPage() {
  const [initialImageUrl, setInitialImageUrl] = useState(null);
  const [finalImageUrl, setFinalImageUrl] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  const [fechaResolucion, setFechaResolucion] = useState("");

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    data.done = data.done === "true" ? true : false;
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("done", data.done ? "true" : "false"); // Ensure boolean to string conversion if necessary
    formData.append(
      "fecha_resolucion",
      moment(data.fechaResolucion).format("YYYY-MM-DDTHH:mm:ss")
    );

    // Attach files only if they are selected and are instances of File
    if (data.foto_inicial && data.foto_inicial instanceof File) {
      formData.append("foto_inicial", data.foto_inicial);
    }
    if (data.foto_final && data.foto_final instanceof File) {
      formData.append("foto_final", data.foto_final);
    }

    try {
      if (params.id) {
        await updateTask(params.id, formData); // Assuming this API expects an ID and FormData
        toast.success("Reporte actualizado");
      } else {
        await createTask(formData); // Assuming this API expects FormData
        toast.success("Reporte creado");
      }
      navigate("/tasks"); // Redirect on success
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar el Reporte");
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const { data } = await getTask(params.id);
        setValue("title", data.title);
        setValue("description", data.description);
        setValue("done", data.done);
        setValue(
          "fechaResolucion",
          moment(data.fecha_resolucion).format("YYYY-MM-DD")
        );

        // Set the image URLs instead of the image files
        setInitialImageUrl(data.foto_inicial);
        setFinalImageUrl(data.foto_final);

        // Set the fechaResolucion state
        setFechaResolucion(moment(data.fecha_resolucion).format("YYYY-MM-DD"));
      }
    };

    loadTask();
  }, [params.id, setValue, setInitialImageUrl, setFinalImageUrl]); // Include setValue in the dependency array

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-zinc-800 p-10 rounded-lg mt-2"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl mb-7">{params.id ? `Reporte ${params.id}` : 'Reporte nuevo'}</h2>

        <div className="mb-5" >
          <label htmlFor="title" className="block mb-2">
            Título del Reporte
          </label>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
            disabled={Boolean(params.id)}
          />
          <div className="flex justify-center items-center">
            <button
              onClick={() => navigate(`/eventos/${params.id}`)}
              className="w-80% py-2 px-3 mt-4 uppercase rounded bg-green-500 text-white ml-2 "
            >
              Registrar Avance o comentar
            </button>
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block mb-2">
            Descripción
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="w-full px-3 py-2 bg-zinc-700 rounded"
            disabled={Boolean(params.id)}
          />
        </div>

        <div className="mb-5 flex justify-center">
          <label htmlFor="fechaResolucion" className="block mb-2 mr-4">
            Fecha Compromiso
          </label>
          <input
            id="fechaResolucion"
            type="date"
            value={fechaResolucion}
            onChange={(e) => {
              setFechaResolucion(e.target.value);
              setValue("fechaResolucion", e.target.value); // Update the value in react-hook-form
            }}
            className="w-1/2 px-3 py-2 bg-zinc-700 rounded"
            style={{ textAlign: 'center' }}
            disabled={Boolean(params.id)}
          />
        </div>

        {initialImageUrl && <img src={initialImageUrl} alt="Imagen inicial" />}
        <div className="mb-5">
          <label htmlFor="fotoInicial" className="block mb-2">
            Foto Inicial
          </label>
          <input
            id="fotoInicial"
            type="file"
            onChange={(e) => setValue("foto_inicial", e.target.files[0])}
            className="w-full px-3 py-2 bg-zinc-700 rounded"
            disabled={Boolean(params.id)}
          />
        </div>

        {finalImageUrl && <img src={finalImageUrl} alt="Imagen final" />}

        <div className="mb-5">
          <label htmlFor="fotoFinal" className="block mb-2">
            Foto Actualizada
          </label>
          <input
            id="fotoFinal"
            type="file"
            onChange={(e) => setValue("foto_final", e.target.files[0])}
            className="w-full px-3 py-2 bg-zinc-700 rounded"
          />
        </div>

        <div className="mb-5 flex justify-center">
          <label htmlFor="done" className="block mb-2 mr-4">
            Status
          </label>
          <select
            id="done"
            {...register("done")}
            className="w-1/2 px-3 py-2 bg-zinc-700 rounded"
          >
            <option value="false">Pendiente</option>
            <option value="true">Hecho</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-3 uppercase rounded bg-indigo-500 text-white"
        >
          Guardar Reporte
        </button>
      </form>

      {params.id && (
        <div className="flex justify-center items-center">
          <button
            onClick={async () => {
              const confirmed = window.confirm(
                "¿Estás seguro de que quieres eliminar este Reporte?"
              );
              if (confirmed) {
                await deleteTask(params.id);
                toast.success("Reporte eliminado");
                navigate("/tasks");
              }
            }}
            className="w-1/2 py-2 px-3 mt-4 uppercase rounded bg-red-500 text-white mr-2"
          >
            Eliminar Reporte
          </button>

        </div>
      )}
    </div>
  );
}
