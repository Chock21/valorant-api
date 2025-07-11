import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function AgentDetail() {
  const { id } = useParams();
  const [msg, setMsg] = useState('');
  const [agent, setAgent] = useState(null);
  const [editAgentData, setEditAgent] = useState({ _id: '', name: '', image: '', rol: '', descripcion: '' });
  const HOST = "http://127.0.0.1:3000/api";
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  
  async function fetchAgent() {
    try {
      const response = await fetch(`${HOST}/agents/${id}`);
      const data = await response.json();
      setAgent(data);
      setEditAgent({
        _id: data._id,
        name: data.name,
        image: data.image.split('/uploads/agents/')[1] || data.image,
        rol: data.rol,
        descripcion: data.descripcion
      });
    } catch (error) {
      console.error("Error fetching agent:", error);
      alert("Error al cargar el agente");
    }
  }

  useEffect(() => {
    fetchAgent();
  }, [id]);

  async function handleUpdate() {
    try {
      let body;
      let headers = {
        "Authorization": `Bearer ${token}`,
      };

      if (editAgentData.image instanceof File) {
        const formData = new FormData();
        formData.append('name', editAgentData.name);
        formData.append('rol', editAgentData.rol);
        formData.append('descripcion', editAgentData.descripcion);
        formData.append('image', editAgentData.image);
        body = formData;
      } else {
        body = JSON.stringify({
          name: editAgentData.name,
          rol: editAgentData.rol,
          descripcion: editAgentData.descripcion,
          image: editAgentData.image
        });
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`${HOST}/agents/${id}`, {
        method: "PUT",
        headers,
        body
      });
      if (!response.ok) throw new Error('Error al actualizar');
      await fetchAgent();
      setMsg('Agente Actualizado');
    } catch (error) {
      console.error(error);
      setMsg('Error al actualizar el agente');
    }
  }

  async function handleDelete() {
    if (!window.confirm("¿Estás seguro de eliminar este agente?")) return;
    try {
      const response = await fetch(`${HOST}/agents/${id}`, { 
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) throw new Error('Error al eliminar');
      setMsg('Agente eliminado');
      navigate('/'); 
    } catch (error) {
      setMsg('Error al eliminar el agente');
    }
  }

  if (!agent) {
    return (
      <div className="text-center my-5">
        <h2>No se encontró el agente</h2>
      </div>
    );
  }

  return (
    <>
      {msg && (
        <div className="alert alert-danger" role="alert">
            {msg}
        </div>
      )}
      <div className="d-flex">
        <img src={agent.image} className="" alt={agent.name} />
        <div className="ms-4">
          <h1 className="">{agent.name}</h1>
          <span className="badge bg-primary">{agent.rol}</span>
          <h2 className="border-top">Descripcion</h2>
          <p className=" mt-3">{agent.descripcion}</p>
          {token && (
            <>
              <h3 className="border-top">Acciones</h3>
              <button
                  className="btn btn-warning me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editAgentModal"
              >
                Editar
              </button>
              <button className="btn btn-danger ms-2" onClick={handleDelete}>Eliminar</button>
            </>
          )}
          <div className="modal fade" id="editAgentModal" tabIndex="-1" aria-labelledby="editAgentModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-light">
                <div className="modal-header">
                  <h5 className="modal-title" id="editAgentModalLabel">Editar Agente</h5>
                  <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white"
                        value={editAgentData.name}
                        onChange={(e) => setEditAgent({ ...editAgentData, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Rol</label>
                      <select
                        className="form-control bg-dark text-white"
                        value={editAgentData.rol}
                        onChange={(e) => setEditAgent({ ...editAgentData, rol: e.target.value })}
                      >
                        <option className="bg-dark text-white" value="">Selecciona un rol</option>
                        <option className="bg-dark text-white" value="Duelista">Duelista</option>
                        <option className="bg-dark text-white" value="Centinela">Centinela</option>
                        <option className="bg-dark text-white" value="Controllador">Controllador</option>
                        <option className="bg-dark text-white" value="Iniciador">Iniciador</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control bg-dark text-white"
                        rows="3"
                        value={editAgentData.descripcion}
                        onChange={(e) => setEditAgent({ ...editAgentData, descripcion: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Imagen</label>
                      <input
                        type="file"
                        className="form-control bg-dark text-white border"
                        accept="image/*"
                        onChange={(e) => setEditAgent({ ...editAgentData, image: e.target.files[0] })}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdate}>Guardar cambios</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgentDetail;
