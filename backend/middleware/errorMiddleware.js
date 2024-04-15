// Middleware pour gérer les routes non trouvées (404)
const  notFound = (req,res,next)=>{
    const err = new Error(`Not Found- ${req.originalUrl}`)
    res.status(404)
    next(err)
}
// Middleware pour gérer les erreurs
const errorHandler = (err,req,res,next) => {
        // Déterminer le code d'état en fonction du code d'état de la réponse, en cas d'erreur interne du serveur (500)
const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    // Répondre avec le code d'état et les détails de l'erreur au format JSON
    res.status(statusCode)
    res.json({
        message: err.message,
                // Ne renvoyer la trace de la pile que dans un environnement de développement
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            })
}
// Exporter les middlewares
export {notFound,errorHandler}