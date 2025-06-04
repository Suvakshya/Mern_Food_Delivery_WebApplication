import itemModel from "../modals/itemModal.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createItem = async (req, res) => {
  try {
    const { name, description, category, price, rating, hearts } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const total = Number(price);

    const newItem = new itemModel({
      name,
      description,
      category,
      price,
      rating,
      hearts,
      imageUrl,
      total
    });

    await newItem.save();
    res.status(201).json({ 
      success: true, 
      message: 'Item created successfully',
      data: newItem 
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item name already exists' 
      });
    }
    console.error('Error creating item:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await itemModel.find().sort({ createdAt: -1 });
    const host = `${req.protocol}://${req.get('host')}`;
    
    const itemsWithFullUrl = items.map(item => ({
      ...item.toObject(),
      imageUrl: item.imageUrl ? `${host}${item.imageUrl}` : null
    }));

    res.status(200).json({ 
      success: true, 
      message: 'Items fetched successfully',
      data: itemsWithFullUrl 
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await itemModel.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }

    // Delete the associated image file
    if (item.imageUrl) {
      const imagePath = path.join(__dirname, `..${item.imageUrl}`);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ 
      success: true, 
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
};