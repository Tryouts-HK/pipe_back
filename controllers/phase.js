const Phase = require('../models/Phase');

const getAllPhases = async (req, res) => {
  try {
    const phases = await Phase.find();
    res.status(200).json(phases);
  } catch (error) {
    console.error('Error fetching phases:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPhaseById = async (req, res) => {
  try {
    const phase = await Phase.findById(req.params.id);
    if (!phase) {
      return res.status(404).json({ error: 'Phase not found' });
    }
    res.status(200).json(phase);
  } catch (error) {
    console.error('Error fetching phase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addPhase = async (req, res) => {
  try {
    const newPhase = new Phase(req.body);
    const savedPhase = await newPhase.save();
    res.status(201).json(savedPhase);
  } catch (error) {
    console.error('Error creating phase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePhase = async (req, res) => {
  try {
    const updatedPhase = await Phase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPhase) {
      return res.status(404).json({ error: 'Phase not found' });
    }
    res.status(200).json(updatedPhase);
  } catch (error) {
    console.error('Error updating phase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deletePhase = async (req, res) => {
  try {
    const deletedPhase = await Phase.findByIdAndDelete(req.params.id);
    if (!deletedPhase) {
      return res.status(404).json({ error: 'Phase not found' });
    }
    res.status(200).json({ message: 'Phase deleted successfully' });
  } catch (error) {
    console.error('Error deleting phase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPhases,
  getPhaseById,
  addPhase,
  updatePhase,
  deletePhase,
};
