import express from 'express'
const router = express.Router()
import {getProducts, getProductById, deleteProduct,createProduct,updateProduct, createproductreview} from '../controlers/productControler.js'
import { protect,admin } from '../middleware/authMiddleware.js'

// Routes pour les produits
router.route('/').get(getProducts)// Obtenir tous les produits
.post(protect,admin,createProduct)// Créer un nouveau produit (accessible uniquement par un administrateur)
router.route('/:id/reviews').post(protect,createproductreview)// Ajouter un nouvel avis à un produit

router.route('/:id').get(getProductById)// Obtenir un produit spécifique par son ID
.delete(protect,admin,deleteProduct)// Supprimer un produit (accessible uniquement par un administrateur)
.put(protect,admin,updateProduct)// Mettre à jour les informations d'un produit (accessible uniquement par un administrateur)



export default router