import express from 'express';
import multer from 'multer';
import { getAgents, getAgentById, addAgent, updateAgent, deleteAgent } from '../controllers/agentController.js';
import { validacionToken } from "../middlewares/auth.js";

const upload = multer({ dest: 'uploads/agents/' })
const router = express.Router();

// Rutas para los agentes
router.get('/', getAgents);
router.get('/:id', getAgentById);
router.post('/', upload.single('image'), addAgent);
router.put('/:id', validacionToken, upload.single('image'), updateAgent);
router.delete('/:id', validacionToken, deleteAgent);

export default router;