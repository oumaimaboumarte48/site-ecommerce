import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
// Schéma Mongoose pour les utilisateurs
const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique: true
    },
    password:{
        type : String,
        required : true

    },
    isAdmin:{
        type : Boolean,
        required : true,
        default : false
    }

},{
    timestamps:true
})
// Méthode pour comparer le mot de passe saisi avec le mot de passe haché stocké dans la base de données
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
// Middleware exécuté avant d'enregistrer un utilisateur dans la base de données
userSchema.pre('save', async function (next){
        // Vérifier si le mot de passe a été modifié avant l'enregistrement
    if(!this.isModified('password')){
        next()
    }
    // Générer un sel et hacher le mot de passe avec le sel
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
// Modèle Mongoose pour les utilisateurs
const User = mongoose.model('User',userSchema);
export default User