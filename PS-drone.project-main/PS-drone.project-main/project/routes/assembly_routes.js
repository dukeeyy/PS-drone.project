const express = require('express');
const Assembly = require('../models/assembly');
const Part = require('../models/part');
const router = express.Router();

// Registrar uma nova montagem de drone
router.post('/register', async (req, res) => {
    const { droneName, parts } = req.body;

    try {
        const assembly = new Assembly({
            droneName,
            parts
        });

        await assembly.save();
        res.status(200).json({ message: 'Montagem de drone registrada com sucesso!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Obter todas as montagens
router.get('/', async (req, res) => {
    try {
        const assemblies = await Assembly.find().populate('parts.part');
        res.status(200).json(assemblies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
