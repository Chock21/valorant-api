import express from "express";
import {getUsers, getUserById, addUser, updateUser, deleteUser, auth} from "../controllers/userController.js" 
import { validacionToken } from "../middlewares/auth.js";

const router = express.Router();

// Rutas para los usuarios
router.post('/login', auth )
router.get('/', getUsers )
router.get('/:id', getUserById )
router.post('/', addUser )
router.delete('/:id', validacionToken, deleteUser )
router.put('/:id', validacionToken, updateUser)

export default router;