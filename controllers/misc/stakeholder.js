const Stakeholder = require('../../models/misc/stakeholder');

const getAllStakeholders = async (req, res) => {
  try {
    const stakeholders = await Stakeholder.find();
    res.status(200).json(stakeholders);
  } catch (error) {
    console.error('Error fetching stakeholders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getStakeholderById = async (req, res) => {
  try {
    const stakeholder = await Stakeholder.findById(req.params.id);
    if (!stakeholder) {
      return res.status(404).json({ error: 'Stakeholder not found' });
    }
    res.status(200).json(stakeholder);
  } catch (error) {
    console.error('Error fetching stakeholder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addStakeholder = async (req, res) => {
  try {
    const newStakeholder = new Stakeholder(req.body);
    const savedStakeholder = await newStakeholder.save();
    res.status(201).json(savedStakeholder);
  } catch (error) {
    console.error('Error creating stakeholder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateStakeholder = async (req, res) => {
  try {
    const updatedStakeholder = await Stakeholder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStakeholder) {
      return res.status(404).json({ error: 'Stakeholder not found' });
    }
    res.status(200).json(updatedStakeholder);
  } catch (error) {
    console.error('Error updating stakeholder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteStakeholder = async (req, res) => {
  try {
    const deletedStakeholder = await Stakeholder.findByIdAndDelete(req.params.id);
    if (!deletedStakeholder) {
      return res.status(404).json({ error: 'Stakeholder not found' });
    }
    res.status(200).json({ message: 'Stakeholder deleted successfully' });
  } catch (error) {
    console.error('Error deleting stakeholder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllStakeholders,
  getStakeholderById,
  addStakeholder,
  updateStakeholder,
  deleteStakeholder,
};
