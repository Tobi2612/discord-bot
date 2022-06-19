const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
    cmd_name: {
        type: String,
        required: true,
        unique: true,
    },
    guild_id: {
        type: String,
        required: true
    },
    cmd_details: {
        type: String,
        required: true
    },
    cmd_counter: {
        type: Number,
        default: 0
    },
    created_by: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Command', CommandSchema);