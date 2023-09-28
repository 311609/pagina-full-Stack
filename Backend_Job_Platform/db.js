const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connect = async () => {
  try { 
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión exitosa a MongoDB Atlas');
    return true; // Devolvemos "true" para indicar éxito
  }
  catch (error) {
    console.error('Error al conectar a MongoDB Atlas:', error);
    throw error; 
  }
};

module.exports = { connect };
