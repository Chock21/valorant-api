import express from 'express';
import multer from 'multer';
import { validacionToken } from '../middlewares/auth.js';
import { getRanks, getRankById, addRank, updateRank, deleteRank } from '../controllers/rankController.js';

const upload = multer({ dest: 'uploads/ranks/' })
const router = express.Router();

// Rutas para los agentes
router.get('/', getRanks);
router.get('/:id', getRankById);
router.post('/', upload.single('image'), addRank);
router.put('/:id',validacionToken, upload.single('image'), updateRank);
router.delete('/:id', validacionToken, deleteRank);

export default router;