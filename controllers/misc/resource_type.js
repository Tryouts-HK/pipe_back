const ResourceType = require('../models/ResourceType');

// Create a new resource type
const createResourceType = async (req, res) => {
  try {
    const newResourceType = new ResourceType(req.body);
    const savedResourceType = await newResourceType.save();
    res.status(201).json(savedResourceType);
  } catch (error) {
    console.error('Error creating resource type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all resource types
const getAllResourceTypes = async (req, res) => {
  try {
    const resourceTypes = await ResourceType.find();
    res.status(200).json(resourceTypes);
  } catch (error) {
    console.error('Error fetching resource types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a resource type by ID
const getResourceTypeById = async (req, res) => {
  try {
    const resourceType = await ResourceType.findById(req.params.id);
    if (!resourceType) {
      return res.status(404).json({ error: 'Resource Type not found' });
    }
    res.status(200).json(resourceType);
  } catch (error) {
    console.error('Error fetching resource type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a resource type by ID
const updateResourceType = async (req, res) => {
  try {
    const updatedResourceType = await ResourceType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedResourceType) {
      return res.status(404).json({ error: 'Resource Type not found' });
    }
    res.status(200).json(updatedResourceType);
  } catch (error) {
    console.error('Error updating resource type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a resource type by ID
const deleteResourceType = async (req, res) => {
  try {
    const deletedResourceType = await ResourceType.findByIdAndDelete(req.params.id);
    if (!deletedResourceType) {
      return res.status(404).json({ error: 'Resource Type not found' });
    }
    res.status(200).json({ message: 'Resource Type deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createResourceType,
  getAllResourceTypes,
  getResourceTypeById,
  updateResourceType,
  deleteResourceType,
};
