import express from 'express'
const router = express.Router()
import { addorderitems, GetMyOrders, getOrderById, GetOrders, updateOrderToPaid,updateOrderToDelivered } from '../controlers/orderControler.js'
import {protect,admin} from '../middleware/authMiddleware.js'

// Routes pour les commandes
router.route('/').post(protect,addorderitems)// Créer une nouvelle commande
.get(protect,admin,GetOrders)// Obtenir toutes les commandes (accessible uniquement par un administrateur)
router.route('/myorders').get(protect,GetMyOrders) // Obtenir les commandes d'un utilisateur connecté

router.route('/:id').get(protect,getOrderById)  // Obtenir une commande spécifique par son ID
router.route('/:id/pay').put(protect,updateOrderToPaid) // Mettre à jour l'état de paiement d'une commande

router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered) // Mettre à jour l'état de livraison d'une commande (accessible uniquement par un administrateur)




export default router