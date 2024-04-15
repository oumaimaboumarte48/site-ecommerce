import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import product from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'


dotenv.config()
connectDB()
// Fonction pour importer les données
const importData = async () => {
    try {
        // Supprimer toutes les données existantes des modèles
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()
       // Ajouter des données aux modèles
         // Insérer tous les utilisateurs dans la base de données
       const createUsers = await User.insertMany(users)
      // Sélectionner l'utilisateur administrateur
       const adminUser = createUsers[0]._id
        // Ajouter l'utilisateur administrateur à chaque produit
        const sampleProducts = product.map(product => {
            return{...product, user: adminUser}
        })
        // Insérer toutes les données des produits dans la base de données
        await Product.insertMany(sampleProducts)
        console.log('Data Imported'.green.inverse)
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}
// Fonction pour supprimer les données
const destroyData = async () => {
    try {
         // Supprimer toutes les données existantes des modèles
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()
    
        console.log(`Data Destroyed !`.red.inverse)
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}
// Exécution du script en fonction de l'argument en ligne de commande
//node backend/seeder -d
if(process.argv[2] === '-d'){
    destroyData()
} else{
    importData()
}