import mongoose from 'mongoose'

// Schéma Mongoose pour les avis sur les produits
const reviewSchema = mongoose.Schema({
    name : { type: String, required: true},
    rating : { type: Number, required: true},
    comment : { type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User' // Relation entre l'avis et l'utilisateur
    },
},{ 
    timestamps: true
})
// Schéma Mongoose pour les produits
const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User' // Relation entre le produit et l'utilisateur
    },
    name:{
        type : String,
        required: true
    },
    images:[{
        type : String,
    }],
    description:{
        type : String,
        required: true
    },
    category:[{
        type : String,
        required: true
    }],
    sizes:[{
        type : String,
        required: true
    }],
    reviews: [reviewSchema],// Utilisation du schéma d'avis défini précédemment
    rating:{
        type : Number,
        required: true,
        default: 0
    },
    numReviews:{
        type : Number,
        required: true,
        default: 0
    },
    price:{
        type : Number,
        required: true,
        default: 0
    },
    countInStock:{
        type : Number,
        required: true,
        default: 0
    },
},{
    timestamps: true
}) 
// Modèle Mongoose pour les produits
const Product = mongoose.model('Product', productSchema)  

export default Product