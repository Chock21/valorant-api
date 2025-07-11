import fs from 'fs';
import path from 'path';
import Agent from "../models/AgentModel.js";

const getAgents = async (request, response) => {
    try {
        const filter = {};
        if (request.query.rol) {
            filter.rol = request.query.rol;
        }
        const agents = await Agent.find(filter);
        if (agents.length === 0) {
            return response.status(404).json({ msg: "No se encontraron agentes con ese rol." });
        }
        const agentsWithUrls = agents.map(agent => {
            const agentObj = agent.toObject();
            if (!agentObj.image.startsWith('http')) {
                agentObj.image = `${request.protocol}://${request.get('host')}/uploads/agents/${agentObj.image}`;
            }
            return agentObj;
        });
        response.status(200).json(agentsWithUrls);
    } catch (error) {
        response.status(500).json({ msg: "Error al obtener los agentes" });
    }
}

const getAgentById = async( request, response) => {
    const id = request.params.id;

    try {
        const agent = await Agent.findById(id);
        if (agent) {
          const agentObj = agent.toObject();
        
          // Generar la URL completa para la imagen
          agentObj.image = `${request.protocol}://${request.get('host')}/uploads/agents/${agentObj.image}`;

          response.status(200).json(agentObj);
        } else {
          response.status(404).json({ msg: 'No se encontró el agente' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error al obtener el agente' });
    }
}

const addAgent = async(request, response) => {
    const { name, rol, descripcion } = request.body;
    const image = request.file ? request.file.filename : null;

    if (!name || !rol || !descripcion || !image) {
        return response.status(403).json({ msg: "Faltan parámetros" });
    }

    const agent = { name, rol, descripcion, image };
    const doc = new Agent(agent);
    await doc.save();
    response.json({ msg: "Agente creado", data: { id: doc._id, name: doc.name } });
}

const updateAgent = async (request, response) => {
    const id = request.params.id;
    let updates = {
        name: request.body.name,
        rol: request.body.rol,
        descripcion: request.body.descripcion
    };

    if (request.file) {
        updates.image = request.file.filename;
    }

    try {
        if (request.file) {
            const agent = await Agent.findById(id);
            if (agent && agent.image) {
                const oldPath = path.join('uploads', 'agents', agent.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            updates.image = request.file.filename;
        }

        const newAgent = await Agent.findByIdAndUpdate(id, updates, { new: true });
        if (newAgent) {
            response.json({ msg: 'Agente actualizado', data: newAgent });
        } else {
            response.status(404).json({ msg: 'No se encontró el agente' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error al actualizar el agente' });
    }   
}

const deleteAgent = async (req, res) => {
  const id = req.params.id;
  try {
    const agent = await Agent.findById(id);
    if (!agent) {
      return res.status(404).json({ msg: 'No se encontró el agente' });
    }

    await Agent.findByIdAndDelete(id);

    return res.json({ msg: 'Agente eliminado' });
  } catch (error) {
    console.error('Error al eliminar el agente:', error);
    return res.status(500).json({ msg: 'Error al eliminar el agente', error: error.message });
  }
};

export { getAgents, getAgentById, addAgent, updateAgent, deleteAgent };