import path from 'path';
import express  from 'express'
import dotenv  from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import  productRoutes  from './routes/productRoutes.js';

import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()
// Middleware pour afficher les logs de requêtes en mode développement
if(process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'))
}

app.use(express.json())
// Routes API pour les utilisateurs, les commandes et les produits
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
// Route pour obtenir la clé client PayPal depuis les variables d'environnement
app.get('/api/config/paypal',(req,res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname= path.resolve()

// Middleware pour servir les fichiers statiques en production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}else{
        // Route de test pour indiquer que l'API est en cours d'exécution
    app.get('/', (req,res) =>{
        res.send('API is Runn....')
    })
    
}


// Middleware pour gérer les erreurs 404
app.use(notFound)
// Middleware pour gérer les erreurs globales
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server runingin ${process.env.NODE_ENV } mode on port ${PORT}`.yellow.bold))
