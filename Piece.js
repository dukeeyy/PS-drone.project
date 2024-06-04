const mongoose = require('mongoose');

const pieceSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { type: String, required: true },
  preco: { type: Number, required: true },
});

module.exports = mongoose.model('Piece', pieceSchema);
