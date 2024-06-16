const RiskCategory = require('../models/RiskCategory');
const RiskItem = require('../models/RiskItem');

// Risk Category Controllers
const getAllRiskCategories = async (req, res) => {
  try {
    const categories = await RiskCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching risk categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRiskCategoryById = async (req, res) => {
  try {
    const category = await RiskCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Risk Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching risk category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addRiskCategory = async (req, res) => {
  try {
    const newCategory = new RiskCategory(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating risk category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateRiskCategory = async (req, res) => {
  try {
    const updatedCategory = await RiskCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Risk Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating risk category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRiskCategory = async (req, res) => {
  try {
    const deletedCategory = await RiskCategory.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Risk Category not found' });
    }
    res.status(200).json({ message: 'Risk Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting risk category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Risk Item Controllers
const getAllRiskItems = async (req, res) => {
  try {
    const items = await RiskItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching risk items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRiskItemById = async (req, res) => {
  try {
    const item = await RiskItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Risk Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching risk item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addRiskItem = async (req, res) => {
  try {
    const newItem = new RiskItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating risk item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateRiskItem = async (req, res) => {
  try {
    const updatedItem = await RiskItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Risk Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating risk item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRiskItem = async (req, res) => {
  try {
    const deletedItem = await RiskItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Risk Item not found' });
    }
    res.status(200).json({ message: 'Risk Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting risk item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllRiskCategories,
  getRiskCategoryById,
  addRiskCategory,
  updateRiskCategory,
  deleteRiskCategory,
  getAllRiskItems,
  getRiskItemById,
  addRiskItem,
  updateRiskItem,
  deleteRiskItem,
};
