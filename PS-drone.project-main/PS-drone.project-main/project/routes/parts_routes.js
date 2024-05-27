const express = require('express');
const Part = require('../models/part');
const router = express.Router();

// Registrar uma nova peça
router.post('/register', async (req, res) => {
    const { name, type, quantity } = req.body;

    try {
        const part = new Part({
            name,
            type,
            quantity
        });

        await part.save();
        res.status(200).json({ message: 'Peça registrada com sucesso!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Obter todas as peças
router.get('/', async (req, res) => {
    try {
        const parts = await Part.find();
        res.status(200).json(parts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
