// Importation des modules nécessaires
import mongose from 'mongoose'
import colors from 'colors'

// Fonction de connexion à MongoDB
const connectDB = async () => {
    try{
         // Connexion à MongoDB en utilisant l'URI et les options fournies
        const conn = await mongose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
         // Journaliser la connexion réussie à MongoDB
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
      console.error(`Error: ${error.message}`.red.underline.bold)
            process.exit(1)
    }
}
// Exporter la fonction connectDB pour être utilisée dans d'autres parties de l'application
export default connectDB