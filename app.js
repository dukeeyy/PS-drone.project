const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const authRoutes = require('./routes/authRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const dronesRoutes = require('./routes/dronesRoutes'); // Adicionamos as rotas de drones aqui
const userRoutes = require('./routes/userRoutes'); // Adicionamos as rotas de users aqui
const piecesRoutes = require('./routes/piecesRoutes');
const assembliesRoutes = require('./routes/assembliesRoutes');
const swaggerDocument = YAML.load('./api.yaml');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/dronesps', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado à base de dados MongoDB'))
.catch(err => console.error('Erro ao conectar à base de dados', err));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/drones', dronesRoutes); // Adicionamos as rotas de drones aqui
app.use('/api/user', userRoutes); // Adicionamos as rotas de users aqui
app.use('/api/pecas', piecesRoutes);
app.use('/api/montagens', assembliesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});

module.exports = app;
