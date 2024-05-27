const mongoose = require('mongoose');

const AssemblySchema = new mongoose.Schema({
    droneName: {
        type: String,
        required: true
    },
    parts: [{
        part: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'part'
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('assembly', AssemblySchema);
