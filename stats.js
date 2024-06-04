const express = require('express');
const Assembly = require('../models/Assembly');

const router = express.Router();

// aqui podemos ver as estatísticas de montagens
router.get('/assemblies', async (req, res) => {
    try {
        // o número de montagens em andamento
        const ongoingCount = await Assembly.countDocuments({ status: 'ongoing' });

        res.status(200).json({
            ongoingAssemblies: ongoingCount
        });
    } catch (error) {
        console.error('Erro ao obter estatísticas de montagens:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

module.exports = router;
