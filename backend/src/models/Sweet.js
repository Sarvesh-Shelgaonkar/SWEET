const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    description: { 
        type: String,
        required: true
    },
    category: { 
        type: String, 
        required: true,
        enum: ['chocolate', 'indian', 'pastries', 'seasonal']
    },
    imageUrl: { 
        type: String,
        default: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400'
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 4.5
    },
    isActive: {
        type: Boolean,
        default: true
    },
    ingredients: [{
        type: String
    }],
    tags: [{
        type: String
    }]
}, { 
    timestamps: true 
});

// Index for search optimization
sweetSchema.index({ name: 'text', description: 'text' });
sweetSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model('Sweet', sweetSchema);