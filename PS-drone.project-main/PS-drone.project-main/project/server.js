const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const partRoutes = require('./routes/parts_routes');
const assemblyRoutes = require('./routes/assembly_routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/droneAssembly', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware para analisar JSON
app.use(bodyParser.json());

// Rotas de autenticação
app.use('/api/v1/auth', authRoutes);

// Rotas de peças
app.use('/api/v1/parts', partRoutes);

// Rotas de montagem
app.use('/api/v1/assemblies', assemblyRoutes);

// Inicio do servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
