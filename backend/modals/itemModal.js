import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  hearts: {
    type: Number,
    default: 0,
    min: 0
  },
  imageUrl: {
    type: String
  },
  total: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;