const GeographicalArea = require('../models/GeographicalArea');

const getAllGeographicalAreas = async (req, res) => {
  try {
    const areas = await GeographicalArea.find();
    res.status(200).json(areas);
  } catch (error) {
    console.error('Error fetching geographical areas:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getGeographicalAreaById = async (req, res) => {
  try {
    const area = await GeographicalArea.findById(req.params.id);
    if (!area) {
      return res.status(404).json({ error: 'Geographical Area not found' });
    }
    res.status(200).json(area);
  } catch (error) {
    console.error('Error fetching geographical area:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addGeographicalArea = async (req, res) => {
  try {
    const newArea = new GeographicalArea(req.body);
    const savedArea = await newArea.save();
    res.status(201).json(savedArea);
  } catch (error) {
    console.error('Error creating geographical area:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateGeographicalArea = async (req, res) => {
  try {
    const updatedArea = await GeographicalArea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArea) {
      return res.status(404).json({ error: 'Geographical Area not found' });
    }
    res.status(200).json(updatedArea);
  } catch (error) {
    console.error('Error updating geographical area:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteGeographicalArea = async (req, res) => {
  try {
    const deletedArea = await GeographicalArea.findByIdAndDelete(req.params.id);
    if (!deletedArea) {
      return res.status(404).json({ error: 'Geographical Area not found' });
    }
    res.status(200).json({ message: 'Geographical Area deleted successfully' });
  } catch (error) {
    console.error('Error deleting geographical area:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllGeographicalAreas,
  getGeographicalAreaById,
  addGeographicalArea,
  updateGeographicalArea,
  deleteGeographicalArea,
};
