const Objective = require('../../models/misc/objective');

const getAllObjectives = async (req, res) => {
  try {
    const objectives = await Objective.find();
    res.status(200).json(objectives);
  } catch (error) {
    console.error('Error fetching objectives:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getObjectiveById = async (req, res) => {
  try {
    const objective = await Objective.findById(req.params.id);
    if (!objective) {
      return res.status(404).json({ error: 'Objective not found' });
    }
    res.status(200).json(objective);
  } catch (error) {
    console.error('Error fetching objective:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addObjective = async (req, res) => {
  try {
    const newObjective = new Objective(req.body);
    const savedObjective = await newObjective.save();
    res.status(201).json(savedObjective);
  } catch (error) {
    console.error('Error creating objective:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateObjective = async (req, res) => {
  try {
    const updatedObjective = await Objective.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedObjective) {
      return res.status(404).json({ error: 'Objective not found' });
    }
    res.status(200).json(updatedObjective);
  } catch (error) {
    console.error('Error updating objective:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteObjective = async (req, res) => {
  try {
    const deletedObjective = await Objective.findByIdAndDelete(req.params.id);
    if (!deletedObjective) {
      return res.status(404).json({ error: 'Objective not found' });
    }
    res.status(200).json({ message: 'Objective deleted successfully' });
  } catch (error) {
    console.error('Error deleting objective:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllObjectives,
  getObjectiveById,
  addObjective,
  updateObjective,
  deleteObjective,
};
