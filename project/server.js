const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/droneAssembly', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware para analisar JSON
app.use(bodyParser.json());

// Autenticação
app.use('/api/v1/auth', authRoutes);

// Inicio do servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
