import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center bg-zinc-500 p-3 hover:bg-blue-800 hover:cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 shadow-lg rounded-lg"
      style={{ width: "450px" }}
      onClick={() => {
        navigate(`/tasks/${task.id}`);
      }}
    >
      <h1 className="text-white font-bold uppercase rounded-lg text-2xl mb-2 text-center">
        {task.title}
        {task.done ? (
          <span className="text-green-500 text-sm ml-2">Finalizado</span>
        ) : (
          <span className="text-red-500 text-sm ml-2">Pendiente</span>
        )}
      </h1>
      <p className="text-white text-lg text-center">
        {new Intl.DateTimeFormat("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }).format(new Date(task.fecha_creacion))}
      </p>
      <p className="text-yellow-500 text-lg text-center">{task.description}</p>
      <img
        src={task.foto_inicial}
        alt="Foto inicial"
        style={{
          width: "350px",
          height: "250px",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
      <p className="text-white text-lg text-center">
        {new Intl.DateTimeFormat("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour12: false,
        }).format(new Date(task.fecha_resolucion))}
      </p>
      <img
        src={task.foto_final}
        alt="Foto actualizada"
        style={{ width: "350px", height: "250px", objectFit: "cover" }}
      />
    
      
     
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool,
    description: PropTypes.string.isRequired,
    foto_inicial: PropTypes.string,
    foto_final: PropTypes.string,
    fecha_resolucion: PropTypes.instanceOf(Date),
    fecha_creacion: PropTypes.instanceOf(Date),
  }).isRequired,
};
