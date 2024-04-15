import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// Middleware pour protéger les routes en vérifiant le token JWT

const protect = asyncHandler(async(req, res, next) =>{
    let token 
     
        // Vérifier si l'en-tête Authorization existe et commence par 'Bearer'

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            
                        // Extraire le token de l'en-tête
         token = req.headers.authorization.split(' ')[1]

                     // Vérifier le token en utilisant la clé secrète JWT

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

                        // Récupérer l'utilisateur associé au token (à l'exception du mot de passe)

            req.user = await User.findById(decoded.id).select('-password')

                        // Passer à la prochaine étape du middleware

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
            
        }
    } 

        // Si aucun token n'est trouvé dans l'en-tête, renvoyer une erreur non autorisée

    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token')
    }
    
})

// Middleware pour autoriser uniquement les utilisateurs admin

const admin = (req,res,next)=>{
        // Vérifier si l'utilisateur est authentifié et a le rôle d'administrateur

    if(req.user && req.user.isAdmin){
         next()
    }
    else{
                // Passer à la prochaine étape du middleware

        res.status(401)
        throw new Error('Not Authorized as an admin')

    }
}

// Exporter les middlewares

export {protect,admin}