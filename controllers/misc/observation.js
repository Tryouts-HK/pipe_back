const ObservationType = require('../models/ObservationType');

const getAllObservationTypes = async (req, res) => {
  try {
    const types = await ObservationType.find();
    res.status(200).json(types);
  } catch (error) {
    console.error('Error fetching observation types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getObservationTypeById = async (req, res) => {
  try {
    const type = await ObservationType.findById(req.params.id);
    if (!type) {
      return res.status(404).json({ error: 'Observation Type not found' });
    }
    res.status(200).json(type);
  } catch (error) {
    console.error('Error fetching observation type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addObservationType = async (req, res) => {
  try {
    const newType = new ObservationType(req.body);
    const savedType = await newType.save();
    res.status(201).json(savedType);
  } catch (error) {
    console.error('Error creating observation type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateObservationType = async (req, res) => {
  try {
    const updatedType = await ObservationType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedType) {
      return res.status(404).json({ error: 'Observation Type not found' });
    }
    res.status(200).json(updatedType);
  } catch (error) {
    console.error('Error updating observation type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteObservationType = async (req, res) => {
  try {
    const deletedType = await ObservationType.findByIdAndDelete(req.params.id);
    if (!deletedType) {
      return res.status(404).json({ error: 'Observation Type not found' });
    }
    res.status(200).json({ message: 'Observation Type deleted successfully' });
  } catch (error) {
    console.error('Error deleting observation type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllObservationTypes,
  getObservationTypeById,
  addObservationType,
  updateObservationType,
  deleteObservationType,
};
