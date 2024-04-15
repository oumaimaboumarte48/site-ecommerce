import express from 'express'
const router = express.Router()
import {authUser, registerUser, getUserProfile, updateUserProfile,getUsers, deleteUser, getUserByID, updateUser } from '../controlers/userControler.js'
import {admin, protect} from '../middleware/authMiddleware.js'

// Routes pour les utilisateurs
router.route('/').post(registerUser)// Enregistrer un nouvel utilisateur
.get(protect,admin,getUsers)// Obtenir tous les utilisateurs (accessible uniquement par un administrateur)

router.post('/login', authUser)// Authentifier l'utilisateur lors de la connexion

router.route('/profile').get(protect, getUserProfile)// Obtenir le profil de l'utilisateur connecté
.put(protect, updateUserProfile )// Mettre à jour le profil de l'utilisateur connecté

router.route('/:id').delete(protect,admin,deleteUser)// Supprimer un utilisateur (accessible uniquement par un administrateur)
.get(protect,admin,getUserByID)// Obtenir un utilisateur spécifique par son ID (accessible uniquement par un administrateur)
.put(protect,admin,updateUser)// Mettre à jour les informations d'un utilisateur (accessible uniquement par un administrateur)


export default router