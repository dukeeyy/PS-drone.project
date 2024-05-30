const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Registro de novo utilizador
router.post('/registro', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar se o utilizador já existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Utilizador já existe' });
        }

        // Criar novo utilizador
        user = new User({
            username,
            email,
            password
        });

        // Criptografar senha
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).json({ message: 'Utilizador registrado com sucesso!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Autenticação do utilizador
router.post('/autenticacao', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar se o utilizador existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Verificar a senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gerar token JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token, message: 'Utilizador autenticado com sucesso, Bem Vindo!' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req,res) =>{
    try {
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.status(500).json({ message: 'erro', error});
    }
});

module.exports = router;
