const mongoose = require('mongoose');

const assemblySchema = new mongoose.Schema({
  droneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drone', required: true },
  pecas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Piece', required: true }],
  dataMontagem: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assembly', assemblySchema);

const express = require('express');
const Assembly = require('../models/Assembly');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const Part = require('../models/Parts');

//Endpoint to register a new drone assembly
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { parts } = req.body;
        const userId = req.user._id;

        const newAssembly = new Assembly({ userId, parts });
        await newAssembly.save();

        res.status(201).json(newAssembly);
    } catch (error) {
        console.error('Error creating assembly:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Endpoint to get all the drone assembly of a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const assemblies = await Assembly.find({userId: req.user._id}).populate('parts');
        res.status(200).json(assemblies);
    } catch (error) {
        console.error('Error fetching assemblies:', error);
        res.status(500).json({message: 'Internal server error' });
    }
});

//Endpoint to update a drone assembly
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { parts } = req.body;
        const userId = req.user._id;

        // Validar IDs das peças
        const validParts = await Part.find({ _id: { $in: parts } });
        if (validParts.length !== parts.length) {
            return res.status(400).json({ message: 'Uma ou mais peças são inválidas' });
        }

        // Encontrar a montagem
        const assembly = await Assembly.findById(id);
        if (!assembly) {
            return res.status(404).json({ message: 'Montagem não encontrada' });
        }

        // Verificar se o usuário é o proprietário
        if (!assembly.userId || assembly.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Não autorizado' });
        }

        // Atualizar a montagem
        assembly.parts = parts;
        await assembly.save();

        res.status(200).json(assembly);
    } catch (error) {
        console.error('Erro ao atualizar a montagem:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

//Endpoint to delete an assembly
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Encontrar a montagem
        const assembly = await Assembly.findById(id);
        if (!assembly) {
            return res.status(404).json({ message: 'Montagem não encontrada' });
        }

        // Verificar se o usuário é o proprietário
        if (!assembly.userId || assembly.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Não autorizado' });
        }

        // Excluir a montagem
        await Assembly.findByIdAndDelete(id);

        res.status(204).send(); // Sem conteúdo
    } catch (error) {
        console.error('Erro ao excluir a montagem:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

module.exports = router;