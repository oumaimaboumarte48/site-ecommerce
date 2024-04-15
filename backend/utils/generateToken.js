import jwt from 'jsonwebtoken';

// Fonction pour générer un jeton JWT à partir de l'ID de l'utilisateur
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'// Le jeton expire après 30 jours
    })
}

export default generateToken