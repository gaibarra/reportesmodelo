// import { useNavigate } from "react-router-dom";

// export function TaskCard({ task }) {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="bg-zinc-800 p-3 hover:bg-blue-700 hover:cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 shadow-lg rounded-lg"
//       onClick={() => {
//         navigate(`/tasks/${task.id}`);
//       }}
//     >
//       <h1 className="text-white font-bold uppercase rounded-lg text-2xl mb-2">
//         {task.title}
//       </h1>
//       <p className="text-slate-400 text-lg">{task.description}</p>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-500 p-3 hover:bg-blue-800 hover:cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 shadow-lg rounded-lg"
      onClick={() => {
        navigate(`/tasks/${task.id}`);
      }}
    >
      <h1 className="text-white font-bold uppercase rounded-lg text-2xl mb-2">
        {task.title}
        {task.done ? (
          <span className="text-green-500 text-sm ml-2">Finalizado</span>
        ) : (
          <span className="text-red-500 text-sm ml-2">Pendiente</span>
        )}
      </h1>
      <p className="text-white text-lg">
        {new Intl.DateTimeFormat("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
          
        }).format(new Date(task.fecha_creacion))}
      </p>

      <p className="text-yellow
      -500 text-lg">{task.description}</p>
      <img
        src={task.foto_inicial}
        alt="Foto inicial"
        style={{
          width: "250px",
          height: "250px",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
      <p className="text-white text-lg">
        {new Intl.DateTimeFormat("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
          // hour: "numeric",
          // minute: "numeric",
          hour12: false,
          
        }).format(new Date(task.fecha_resolucion))}
      </p>
      <img
        src={task.foto_final}
        alt="Foto final"
        style={{ width: "250px", height: "250px", objectFit: "cover" }}
      />
    </div>
  );
}
